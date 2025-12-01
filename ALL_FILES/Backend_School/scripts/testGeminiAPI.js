import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY;

console.log('Testing Gemini API endpoints...\n');

// Test 1: v1beta endpoint with gemini-1.5-flash
async function testV1Beta() {
  console.log('Test 1: v1beta/models/gemini-1.5-flash:generateContent');
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{ text: 'Say hello' }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    console.log('✓ SUCCESS:', response.data.candidates[0].content.parts[0].text);
    return true;
  } catch (error) {
    console.log('✗ FAILED:', error.response?.status, error.response?.data || error.message);
    return false;
  }
}

// Test 2: v1 endpoint with gemini-pro
async function testV1() {
  console.log('\nTest 2: v1/models/gemini-pro:generateContent');
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{ text: 'Say hello' }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    console.log('✓ SUCCESS:', response.data.candidates[0].content.parts[0].text);
    return true;
  } catch (error) {
    console.log('✗ FAILED:', error.response?.status, error.response?.data || error.message);
    return false;
  }
}

// Test 3: v1beta with gemini-pro
async function testV1BetaGeminiPro() {
  console.log('\nTest 3: v1beta/models/gemini-pro:generateContent');
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{ text: 'Say hello' }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    console.log('✓ SUCCESS:', response.data.candidates[0].content.parts[0].text);
    return true;
  } catch (error) {
    console.log('✗ FAILED:', error.response?.status, error.response?.data || error.message);
    return false;
  }
}

// Run all tests
(async () => {
  const test1 = await testV1Beta();
  const test2 = await testV1();
  const test3 = await testV1BetaGeminiPro();
  
  console.log('\n=== RESULTS ===');
  console.log('v1beta/gemini-1.5-flash:', test1 ? '✓' : '✗');
  console.log('v1/gemini-pro:', test2 ? '✓' : '✗');
  console.log('v1beta/gemini-pro:', test3 ? '✓' : '✗');
})();
