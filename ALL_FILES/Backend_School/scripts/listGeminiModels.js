import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY;

console.log('Listing available Gemini models...\n');

async function listModels() {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    console.log(`Found ${response.data.models.length} models:\n`);
    response.data.models.forEach(model => {
      console.log(`Name: ${model.name}`);
      console.log(`Display Name: ${model.displayName}`);
      console.log(`Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
      console.log('---');
    });
  } catch (error) {
    console.log('Error listing models:', error.response?.status, error.response?.data || error.message);
  }
}

listModels();
