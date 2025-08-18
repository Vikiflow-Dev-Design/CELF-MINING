// Test login endpoint
const axios = require('axios');

async function testLogin() {
  console.log('🔐 Testing Login Endpoint\n');

  // Use the same credentials you just registered
  const loginData = {
    email: "victor@example.com",
    password: "password123"
  };

  console.log('📤 Sending login request with data:', JSON.stringify(loginData, null, 2));

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Login Success!');
    console.log('📋 Response:', JSON.stringify(response.data, null, 2));
    
    // Extract token for testing protected endpoints
    const token = response.data.data?.token;
    if (token) {
      console.log('\n🎫 JWT Token received:', token.substring(0, 50) + '...');
      
      // Test a protected endpoint
      await testProtectedEndpoint(token);
    }

  } catch (error) {
    if (error.response) {
      console.log('❌ Login Failed');
      console.log('📋 Status:', error.response.status);
      console.log('📋 Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ Network Error:', error.message);
    }
  }
}

async function testProtectedEndpoint(token) {
  console.log('\n🔒 Testing Protected Endpoint (Wallet Balance)');
  
  try {
    const response = await axios.get('http://localhost:5000/api/wallet/balance', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Protected endpoint success!');
    console.log('💰 Wallet data:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    if (error.response) {
      console.log('❌ Protected endpoint failed');
      console.log('📋 Status:', error.response.status);
      console.log('📋 Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ Network Error:', error.message);
    }
  }
}

async function testInvalidLogin() {
  console.log('\n🚫 Testing Invalid Login (Wrong Password)');
  
  const invalidData = {
    email: "victor@example.com",
    password: "wrongpassword"
  };

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', invalidData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('❌ This should have failed!', response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('✅ Correctly rejected invalid credentials');
      console.log('📋 Error message:', error.response.data.message);
    } else {
      console.log('❌ Unexpected error:', error.response?.data || error.message);
    }
  }
}

async function runLoginTests() {
  await testLogin();
  console.log('\n' + '='.repeat(50));
  await testInvalidLogin();
}

runLoginTests();
