const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Quick test script to check if URL scraping and Gemini extraction works
 * Usage: node scripts/testSingleUrl.js <exam_url>
 */

async function testSingleUrl(url) {
  console.log('\n' + '='.repeat(60));
  console.log('TESTING SINGLE URL EXTRACTION');
  console.log('='.repeat(60));
  console.log(`URL: ${url}\n`);

  try {
    // Step 1: Fetch webpage
    console.log('Step 1: Fetching webpage...');
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    console.log('✓ Webpage fetched successfully');
    console.log(`  Status: ${response.status}`);
    console.log(`  Content-Type: ${response.headers['content-type']}`);

    // Step 2: Extract text
    console.log('\nStep 2: Extracting text from HTML...');
    const $ = cheerio.load(response.data);
    $('script, style, noscript, iframe').remove();
    const text = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 2000); // Show first 2000 chars
    
    console.log('✓ Text extracted');
    console.log(`  Length: ${text.length} characters`);
    console.log('\nPreview:');
    console.log('-'.repeat(60));
    console.log(text.substring(0, 500) + '...');
    console.log('-'.repeat(60));

    // Step 3: Check if Gemini API key exists
    console.log('\nStep 3: Checking Gemini API configuration...');
    require('dotenv').config();
    if (process.env.GEMINI_API_KEY) {
      console.log('✓ GEMINI_API_KEY found in .env');
      
      // Try Gemini API call
      console.log('\nStep 4: Testing Gemini API...');
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
      
      const geminiResponse = await axios.post(
        geminiUrl,
        {
          contents: [{
            parts: [{
              text: `Extract the exam name from this website: ${text.substring(0, 1000)}`
            }]
          }]
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );
      
      console.log('✓ Gemini API responding correctly');
      const aiResponse = geminiResponse.data.candidates[0].content.parts[0].text;
      console.log('\nGemini Response:');
      console.log('-'.repeat(60));
      console.log(aiResponse);
      console.log('-'.repeat(60));
    } else {
      console.log('✗ GEMINI_API_KEY not found in .env file');
      console.log('  Add it to continue with AI extraction');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✓ TEST SUCCESSFUL - URL is ready for processing!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n✗ TEST FAILED');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
    console.log('\nTroubleshooting:');
    console.log('- Check if the URL is accessible');
    console.log('- Verify your internet connection');
    console.log('- Some websites block automated requests');
    console.log('- Check if Gemini API key is valid');
    process.exit(1);
  }
}

// Get URL from command line
const testUrl = process.argv[2];

if (!testUrl) {
  console.log('Usage: node scripts/testSingleUrl.js <exam_url>');
  console.log('Example: node scripts/testSingleUrl.js https://jeemain.nta.nic.in/');
  process.exit(1);
}

testSingleUrl(testUrl);
