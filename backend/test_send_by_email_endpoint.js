const axios = require('axios');

async function testSendByEmailEndpoint() {
  console.log('🧪 Testing /wallet/send-by-email endpoint...\n');

  try {
    // First, login to get a token
    console.log('1️⃣ Logging in to get authentication token...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'vikiflow@gmail.com',
      password: 'password123'
    });

    if (!loginResponse.data.success) {
      throw new Error('Login failed: ' + loginResponse.data.message);
    }

    const token = loginResponse.data.data.token;
    console.log('✅ Login successful, token received');

    // Test the send-by-email endpoint
    console.log('\n2️⃣ Testing send-by-email endpoint...');
    const sendResponse = await axios.post('http://localhost:5000/api/wallet/send-by-email', {
      toEmail: 'victor@example.com', // Replace with actual recipient email
      amount: 1,
      description: 'Test transaction from endpoint test'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('\n📊 Response Status:', sendResponse.status);
    console.log('📊 Response Data:', JSON.stringify(sendResponse.data, null, 2));

    if (sendResponse.data.success) {
      console.log('\n✅ Send by email endpoint is working correctly!');
      console.log('✅ Transaction ID:', sendResponse.data.data.transaction.id);
      console.log('✅ Recipient:', sendResponse.data.data.recipient.name);
    } else {
      console.log('\n❌ Send by email failed:', sendResponse.data.message);
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('❌ Response status:', error.response.status);
      console.error('❌ Response data:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to server. Make sure the backend is running on port 5000.');
    } else if (error.code === 'ENOTFOUND') {
      console.error('❌ Server not found. Check the server URL.');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('❌ Request timed out. Server is taking too long to respond.');
    }
  }
}

// Run the test
testSendByEmailEndpoint();
