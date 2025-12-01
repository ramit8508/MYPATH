import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import XLSX from 'xlsx';
import GeminiExamService from '../services/geminiExamService.js';
import Exam from '../models/Exam.js';

dotenv.config();

/**
 * Read exam URLs from Excel, CSV, or text file
 * Automatically detects URLs in any column
 */
function readExamUrls(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const urls = [];
  
  if (ext === '.xlsx' || ext === '.xls' || ext === '.csv') {
    // Read Excel/CSV file
    console.log(`Reading spreadsheet: ${filePath}`);
    const workbook = XLSX.readFile(filePath);
    
    // Process all sheets
    workbook.SheetNames.forEach(sheetName => {
      console.log(`  Processing sheet: ${sheetName}`);
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
      // Extract URLs from all cells
      data.forEach((row, rowIndex) => {
        if (Array.isArray(row)) {
          row.forEach((cell, colIndex) => {
            if (cell && typeof cell === 'string') {
              // Check if cell contains a URL
              const urlMatch = cell.match(/(https?:\/\/[^\s]+)/gi);
              if (urlMatch) {
                urlMatch.forEach(url => {
                  // Clean up the URL
                  url = url.replace(/[,;"'\]\)]+$/, '').trim();
                  try {
                    new URL(url);
                    if (!urls.includes(url)) {
                      urls.push(url);
                      console.log(`    Found URL: ${url}`);
                    }
                  } catch (e) {
                    // Not a valid URL
                  }
                });
              }
            }
          });
        }
      });
    });
  } else {
    // Read plain text file (one URL per line)
    console.log(`Reading text file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
    lines.forEach(line => {
      // Try to extract URL from line
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/gi);
      if (urlMatch) {
        urlMatch.forEach(url => {
          url = url.replace(/[,;"'\]\)]+$/, '').trim();
          try {
            new URL(url);
            if (!urls.includes(url)) {
              urls.push(url);
              console.log(`  Found URL: ${url}`);
            }
          } catch (e) {
            // Not a valid URL
          }
        });
      }
    });
  }
  
  return urls;
}

/**
 * Save exam data to database
 */
async function saveExamToDatabase(examData) {
  try {
    const exam = new Exam(examData);
    await exam.save();
    console.log(`✓ Saved to database: ${examData.name}`);
    return exam;
  } catch (error) {
    console.error(`✗ Failed to save ${examData.name}:`, error.message);
    return null;
  }
}

/**
 * Main processing function
 */
async function processExamsFromSpreadsheet(spreadsheetPath) {
  console.log('='.repeat(60));
  console.log('EXAM DATA SCRAPING WITH GEMINI API');
  console.log('='.repeat(60));
  
  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }
  
  // Connect to database
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
  
  // Read URLs from spreadsheet
  const urls = readExamUrls(spreadsheetPath);
  console.log(`\n✓ Found ${urls.length} exam URLs to process\n`);
  
  if (urls.length === 0) {
    console.log('No valid URLs found. Exiting...');
    process.exit(0);
  }
  
  // Initialize Gemini service
  const geminiService = new GeminiExamService(process.env.GEMINI_API_KEY);
  
  // Process exams
  const examData = await geminiService.processMultipleExams(urls, 2000);
  
  console.log('\n' + '='.repeat(60));
  console.log(`Processing complete: ${examData.length}/${urls.length} exams extracted`);
  console.log('='.repeat(60));
  
  // Save to database
  console.log('\nSaving to database...\n');
  const savedExams = [];
  for (const data of examData) {
    const saved = await saveExamToDatabase(data);
    if (saved) {
      savedExams.push(saved);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`DATABASE SAVE COMPLETE: ${savedExams.length} exams saved`);
  console.log('='.repeat(60));
  
  // Close database connection
  await mongoose.connection.close();
  console.log('\n✓ Database connection closed');
}

// Run the script
const spreadsheetPath = process.argv[2] || './exam_links.txt';

if (!fs.existsSync(spreadsheetPath)) {
  console.error(`ERROR: File not found: ${spreadsheetPath}`);
  console.log('\nUsage: node processExams.js <path-to-exam-links-file>');
  console.log('Example: node processExams.js ./exam_links.txt');
  process.exit(1);
}

processExamsFromSpreadsheet(spreadsheetPath)
  .then(() => {
    console.log('\n✓ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n✗ Fatal error:', error);
    process.exit(1);
  });
