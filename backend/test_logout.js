// Test logout endpoint
const axios = require('axios');

async function testLogoutFlow() {
  console.log('🚪 Testing Complete Logout Flow\n');

  let token = null;

  try {
    // Step 1: Login to get a token
    console.log('1️⃣ Logging in to get token...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: "victor@gmail.com",
      password: "password"
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    token = loginResponse.data.data?.token;
    if (!token) {
      throw new Error('No token received from login');
    }

    console.log('✅ Login successful, token received');
    console.log('🎫 Token:', token.substring(0, 50) + '...');

    // Step 2: Test protected endpoint with token (should work)
    console.log('\n2️⃣ Testing protected endpoint with token...');
    const walletResponse = await axios.get('http://localhost:5000/api/wallet/balance', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Protected endpoint accessible with token');
    console.log('💰 Balance:', walletResponse.data.data?.totalBalance, 'CELF');

    // Step 3: Logout
    console.log('\n3️⃣ Logging out...');
    const logoutResponse = await axios.post('http://localhost:5000/api/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Logout successful');
    console.log('📋 Logout response:', JSON.stringify(logoutResponse.data, null, 2));

    // Step 4: Test protected endpoint after logout (should still work since we don't blacklist tokens)
    console.log('\n4️⃣ Testing protected endpoint after logout...');
    try {
      const postLogoutResponse = await axios.get('http://localhost:5000/api/wallet/balance', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('ℹ️  Token still valid after logout (this is expected behavior)');
      console.log('💡 Note: In production, you might want to implement token blacklisting');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Token invalidated after logout');
      } else {
        console.log('❌ Unexpected error:', error.response?.data || error.message);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

async function testLogoutWithoutToken() {
  console.log('\n' + '='.repeat(50));
  console.log('🚫 Testing Logout Without Token\n');

  try {
    const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('❌ This should have failed! Response:', response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly rejected logout without token');
      console.log('📋 Error:', error.response.data.message);
    } else {
      console.log('❌ Unexpected error:', error.response?.data || error.message);
    }
  }
}

async function testLogoutWithInvalidToken() {
  console.log('\n' + '='.repeat(50));
  console.log('🔒 Testing Logout With Invalid Token\n');

  try {
    const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
      headers: {
        'Authorization': 'Bearer invalid.token.here',
        'Content-Type': 'application/json'
      }
    });

    console.log('❌ This should have failed! Response:', response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly rejected invalid token');
      console.log('📋 Error:', error.response.data.message);
    } else {
      console.log('❌ Unexpected error:', error.response?.data || error.message);
    }
  }
}

async function runLogoutTests() {
  await testLogoutFlow();
  await testLogoutWithoutToken();
  await testLogoutWithInvalidToken();
  
  console.log('\n' + '='.repeat(50));
  console.log('🎯 Logout Testing Complete!');
  console.log('\n💡 Key Points:');
  console.log('   • Logout endpoint requires valid JWT token');
  console.log('   • Current implementation doesn\'t blacklist tokens');
  console.log('   • Tokens remain valid until they expire naturally');
  console.log('   • Mobile app should clear stored tokens on logout');
}

runLogoutTests();
