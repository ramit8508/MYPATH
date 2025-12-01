import axios from 'axios';
import * as cheerio from 'cheerio';

class GeminiExamService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    // Using v1beta with correct model name
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  /**
   * Fetch webpage content
   */
  async fetchWebpage(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Extract text content from HTML
   */
  extractTextFromHtml(html) {
    const $ = cheerio.load(html);
    
    // Remove script and style elements
    $('script, style, noscript, iframe').remove();
    
    // Get text content
    const text = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 15000); // Limit to avoid token limits
    
    return text;
  }

  /**
   * Call Gemini API to extract exam information
   */
  async extractExamInfo(url, htmlContent) {
    try {
      const textContent = this.extractTextFromHtml(htmlContent);
      
      const prompt = `You are an expert at extracting competitive exam information from websites. Analyze the webpage content and extract structured data.

URL: ${url}

Webpage Content:
${textContent}

IMPORTANT INSTRUCTIONS:
1. Extract ONLY factual information present in the content
2. For targetClass, determine the appropriate level:
   - Use "8", "9", "10", "11", "12" for school-level exams
   - Use "college" for undergraduate entrance exams (like JEE, NEET)
   - Use "graduate" for postgraduate entrance exams (like GATE, CAT, GRE)
   - Use "postgraduate" for higher education exams
   - Use "all" if the exam is open to multiple levels
3. For category, choose the most appropriate:
   - "engineering" for technical/engineering exams (JEE, GATE, etc.)
   - "medical" for medical entrance exams (NEET, AIIMS, etc.)
   - "defence" for armed forces exams (NDA, CDS, AFCAT, etc.)
   - "board" for board examinations (CBSE, ICSE, etc.)
   - "olympiad" for olympiad competitions (NTSE, IMO, etc.)
   - "management" for MBA entrance exams (CAT, XAT, MAT, etc.)
   - "government" for civil services and govt jobs (UPSC, SSC, Banking, Railway)
   - "international" for international exams (GRE, GMAT, TOEFL, IELTS, SAT)
   - "certification" for professional certifications (AWS, CA, CMA, CS)
   - "other" if none of the above fit

Extract the following information in JSON format:
{
  "name": "Full official exam name (e.g., 'Joint Entrance Examination Main')",
  "description": "Concise 2-3 sentence description of what the exam is for and who takes it",
  "targetClass": "8, 9, 10, 11, 12, college, graduate, postgraduate, or all",
  "category": "engineering, medical, defence, board, olympiad, management, government, international, certification, or other",
  "syllabus": "Brief summary of topics/subjects covered in the exam (200-300 characters)",
  "registrationLink": "Direct URL for registration/application if mentioned, otherwise empty string",
  "eligibility": "Educational qualification and age requirements (100-200 characters)",
  "examPattern": "Number of papers, duration, question types, marking scheme (150-250 characters)",
  "registrationFee": "Application/Registration fee amount (e.g., '₹1400', '₹500', '₹0' for free exams, 'Varies' if multiple categories). Extract ONLY the fee amount if mentioned, otherwise empty string",
  "examDate": "Exam date in YYYY-MM-DD format if mentioned, otherwise null",
  "registrationDeadline": "Registration deadline in YYYY-MM-DD format if mentioned, otherwise null"
}

CRITICAL: Respond with ONLY valid JSON. No explanations, no markdown code blocks, just the JSON object.`;

      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      
      // Extract JSON from response (handle markdown code blocks)
      let jsonText = generatedText.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }
      
      const examData = JSON.parse(jsonText);
      examData.officialWebsite = url;
      
      return examData;
    } catch (error) {
      console.error(`Error calling Gemini API for ${url}:`, error.message);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      return null;
    }
  }

  /**
   * Process a single exam URL
   */
  async processExamUrl(url) {
    console.log(`Processing: ${url}`);
    
    const htmlContent = await this.fetchWebpage(url);
    if (!htmlContent) {
      console.log(`Failed to fetch ${url}`);
      return null;
    }
    
    const examInfo = await this.extractExamInfo(url, htmlContent);
    if (!examInfo) {
      console.log(`Failed to extract info from ${url}`);
      return null;
    }
    
    console.log(`✓ Successfully processed: ${examInfo.name}`);
    return examInfo;
  }

  /**
   * Process multiple exam URLs (with rate limiting)
   */
  async processMultipleExams(urls, delayMs = 2000) {
    const results = [];
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`\n[${i + 1}/${urls.length}] Processing exam...`);
      
      const result = await this.processExamUrl(url);
      if (result) {
        results.push(result);
      }
      
      // Rate limiting - wait between requests
      if (i < urls.length - 1) {
        console.log(`Waiting ${delayMs}ms before next request...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    return results;
  }
}

export default GeminiExamService;
