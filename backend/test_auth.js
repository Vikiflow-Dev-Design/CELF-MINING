// Simple test script for authentication
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAuthentication() {
  console.log('🧪 Testing CELF Authentication System\n');

  try {
    // Test 1: API Health Check
    console.log('1. Testing API health...');
    const healthResponse = await axios.get(`${BASE_URL.replace('/api', '')}/health`);
    console.log('✅ API is running:', healthResponse.data.message);

    // Test 2: Register a new user
    console.log('\n2. Testing user registration...');
    const registerData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    };

    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
    console.log('✅ User registered:', registerResponse.data.message);
    console.log('   User ID:', registerResponse.data.data.user.id);

    // Test 3: Login with the user
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data.message);
    console.log('   Token received:', loginResponse.data.data.token ? 'Yes' : 'No');

    const token = loginResponse.data.data.token;

    // Test 4: Access protected endpoint (wallet balance)
    console.log('\n4. Testing protected endpoint (wallet balance)...');
    const walletResponse = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Wallet balance retrieved:', walletResponse.data.message);
    console.log('   Balance:', walletResponse.data.data.totalBalance, 'CELF');

    // Test 5: Access protected endpoint without token (should fail)
    console.log('\n5. Testing protected endpoint without token...');
    try {
      await axios.get(`${BASE_URL}/wallet/balance`);
      console.log('❌ This should have failed!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Correctly rejected unauthorized request');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    // Test 6: Get user profile
    console.log('\n6. Testing user profile...');
    const profileResponse = await axios.get(`${BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.message);
    console.log('   User:', profileResponse.data.data.user.firstName, profileResponse.data.data.user.lastName);

    console.log('\n🎉 All authentication tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('   Response:', error.response.data);
    }
  }
}

// Run the test
testAuthentication();
