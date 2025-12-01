import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const TEST_FILE = path.resolve('./scraper_output/scraped_html/jeeadv.ac.in_.html');

function extractTextFromHtml(html) {
  const $ = cheerio.load(html);
  $('script, style, noscript, iframe').remove();
  const text = $('body').text()
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 15000);
  return text;
}

async function testExtraction() {
  console.log('Testing extraction with JEE Advanced website...\n');
  
  if (!fs.existsSync(TEST_FILE)) {
    console.error('Test file not found:', TEST_FILE);
    return;
  }
  
  const html = fs.readFileSync(TEST_FILE, 'utf-8');
  const text = extractTextFromHtml(html);
  
  console.log('Extracted text length:', text.length);
  console.log('First 500 chars:', text.substring(0, 500));
  console.log('\nCalling Gemini API...\n');
  
  const prompt = `Extract exam information from this webpage and return ONLY valid JSON (no markdown, no explanations).

URL: https://jeeadv.ac.in/

Content: ${text.substring(0, 10000)}

JSON format:
{
  "name": "Exam name",
  "description": "Brief description",
  "targetClass": "8|9|10|11|12|college|graduate|postgraduate|all",
  "category": "engineering|medical|defence|board|olympiad|management|government|international|certification|other",
  "syllabus": "Topics covered",
  "registrationLink": "URL or empty",
  "eligibility": "Who can apply",
  "examPattern": "Exam format"
}

JSON:`;

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{
          parts: [{ text: prompt }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );
    
    const result = response.data.candidates[0].content.parts[0].text;
    console.log('✓ Gemini Response:', result);
    
    // Clean and parse JSON
    let cleaned = result.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/```\n?/g, '');
    }
    
    const data = JSON.parse(cleaned);
    console.log('\n✓ Parsed JSON:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('✗ Error:', error.response?.data || error.message);
  }
}

testExtraction();
