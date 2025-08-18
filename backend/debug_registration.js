// Debug registration endpoint
const axios = require('axios');

async function testRegistration() {
  console.log('🧪 Testing Registration Endpoint\n');

  const testData = {
    email: "victor@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe"
  };

  console.log('📤 Sending request with data:', JSON.stringify(testData, null, 2));

  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Success Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('❌ Error Response Status:', error.response.status);
      console.log('❌ Error Response Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ Network Error:', error.message);
    }
  }
}

// Also test a simple health check
async function testHealth() {
  console.log('🏥 Testing Health Endpoint\n');

  try {
    const response = await axios.get('http://localhost:5000/health');
    console.log('✅ Health Check:', response.data);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }
}

async function runTests() {
  await testHealth();
  console.log('\n' + '='.repeat(50) + '\n');
  await testRegistration();
}

runTests();
