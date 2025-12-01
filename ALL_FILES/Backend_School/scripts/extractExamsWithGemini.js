import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from '../models/Exam.js';

dotenv.config();

const HTML_DIR = path.resolve('./scraper_output/scraped_html');
const OUTPUT_JSON = path.resolve('./scraper_output/extracted_exams.json');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in .env. Exiting.');
  process.exit(1);
}

if (!fs.existsSync(HTML_DIR)) {
  console.error('HTML directory not found. Run validateAndFetchLinks.js first.');
  process.exit(1);
}

function extractTextFromHtml(html) {
  const $ = cheerio.load(html);
  $('script, style, noscript, iframe').remove();
  const text = $('body').text()
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 15000);
  return text;
}

async function callGemini(url, textContent) {
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
  "examDate": "Exam date in YYYY-MM-DD format if mentioned, otherwise null",
  "registrationDeadline": "Registration deadline in YYYY-MM-DD format if mentioned, otherwise null"
}

CRITICAL: Respond with ONLY valid JSON. No explanations, no markdown code blocks, just the JSON object.`;

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    let jsonText = generatedText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const examData = JSON.parse(jsonText);
    examData.officialWebsite = url;
    return { success: true, data: examData };
  } catch (error) {
    return { success: false, error: error.message, response: error.response ? error.response.data : null };
  }
}

async function saveToDatabase(examData) {
  try {
    const exam = new Exam(examData);
    await exam.save();
    return { success: true, id: exam._id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

(async function main() {
  const files = fs.readdirSync(HTML_DIR).filter(f => f.endsWith('.html'));
  console.log(`Found ${files.length} HTML files to process.\n`);

  // Connect to MongoDB
  let dbConnected = false;
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✓ Connected to MongoDB\n');
      dbConnected = true;
    } catch (error) {
      console.log('⚠ MongoDB connection failed. Will save to JSON only.\n');
    }
  } else {
    console.log('⚠ MONGODB_URI not set. Will save to JSON only.\n');
  }

  const results = [];
  const extracted = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(HTML_DIR, file);
    process.stdout.write(`\r[${i + 1}/${files.length}] Processing ${file.slice(0, 50)}...`);

    const html = fs.readFileSync(filePath, 'utf-8');
    const text = extractTextFromHtml(html);

    // Try to infer URL from filename
    let url = file.replace(/_/g, '/').replace('.html', '');
    if (!url.startsWith('http')) url = 'https://' + url;

    const geminiResult = await callGemini(url, text);

    if (geminiResult.success) {
      extracted.push(geminiResult.data);
      if (dbConnected) {
        const dbResult = await saveToDatabase(geminiResult.data);
        results.push({ file, url, extracted: true, savedToDB: dbResult.success, data: geminiResult.data });
      } else {
        results.push({ file, url, extracted: true, savedToDB: false, data: geminiResult.data });
      }
    } else {
      results.push({ file, url, extracted: false, error: geminiResult.error });
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log('\n\nExtraction complete.\n');

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ timestamp: new Date().toISOString(), total: files.length, extracted: extracted.length, results, exams: extracted }, null, 2), 'utf-8');
  console.log(`✓ Saved ${extracted.length} extracted exams to ${OUTPUT_JSON}`);

  if (dbConnected) {
    const savedCount = results.filter(r => r.savedToDB).length;
    console.log(`✓ Saved ${savedCount} exams to MongoDB`);
    await mongoose.connection.close();
  }

  console.log(`\nSummary:`);
  console.log(`  Total HTML files: ${files.length}`);
  console.log(`  Successfully extracted: ${extracted.length}`);
  console.log(`  Failed: ${files.length - extracted.length}`);

  process.exit(0);
})();
