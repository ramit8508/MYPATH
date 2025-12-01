import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

async function testAPI() {
  console.log('🧪 Testing MYPATH Exam API\n');
  
  try {
    // Test 1: Health check
    console.log('1️⃣  Testing Health Endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✓ Server Status:', health.data.status);
    console.log('✓ Message:', health.data.message);
    
    // Test 2: Get all exams
    console.log('\n2️⃣  Testing Get All Exams...');
    const all = await axios.get(`${BASE_URL}/exams`);
    console.log(`✓ Total Exams: ${all.data.length}`);
    
    // Test 3: Get exams for class 12
    console.log('\n3️⃣  Testing Get Exams for Class 12...');
    const class12 = await axios.get(`${BASE_URL}/exams/class/12`);
    console.log(`✓ Class 12 Exams: ${class12.data.length}`);
    if (class12.data.length > 0) {
      console.log('   Sample:', class12.data[0].name);
    }
    
    // Test 4: Get exams for college students
    console.log('\n4️⃣  Testing Get Exams for College Students...');
    const college = await axios.get(`${BASE_URL}/exams/class/college`);
    console.log(`✓ College Exams: ${college.data.length}`);
    if (college.data.length > 0) {
      console.log('   Samples:');
      college.data.slice(0, 5).forEach((exam, i) => {
        console.log(`   ${i + 1}. ${exam.name} (${exam.category})`);
      });
    }
    
    // Test 5: Get engineering exams for college
    console.log('\n5️⃣  Testing Get Engineering Exams for College...');
    const engineering = await axios.get(`${BASE_URL}/exams/class/college/category/engineering`);
    console.log(`✓ Engineering Exams: ${engineering.data.length}`);
    if (engineering.data.length > 0) {
      console.log('   Exams:');
      engineering.data.forEach((exam, i) => {
        console.log(`   ${i + 1}. ${exam.name}`);
      });
    }
    
    // Test 6: Get categories for college
    console.log('\n6️⃣  Testing Get Categories for College...');
    const categories = await axios.get(`${BASE_URL}/exams/class/college/categories`);
    console.log('✓ Available Categories:', categories.data.join(', '));
    
    // Test 7: Search exams
    console.log('\n7️⃣  Testing Search Exams (query: "JEE")...');
    const search = await axios.get(`${BASE_URL}/exams/search`, {
      params: { query: 'JEE' }
    });
    console.log(`✓ Search Results: ${search.data.length}`);
    if (search.data.length > 0) {
      search.data.forEach((exam, i) => {
        console.log(`   ${i + 1}. ${exam.name}`);
      });
    }
    
    // Test 8: Get exam statistics
    console.log('\n8️⃣  Testing Get Exam Statistics...');
    const stats = await axios.get(`${BASE_URL}/exams/stats`);
    console.log('✓ Statistics:');
    console.log('   By Class:', JSON.stringify(stats.data.byClass, null, 2));
    console.log('   By Category:', JSON.stringify(stats.data.byCategory, null, 2));
    
    console.log('\n✅ All API tests passed successfully!');
    
  } catch (error) {
    console.error('\n❌ API Test Failed:');
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();
