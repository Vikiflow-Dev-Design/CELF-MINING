/**
 * Test script to verify user search functionality
 * Tests username, email, and wallet address search
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testQueries = [
  { type: 'username', query: 'vikiflow', description: 'Search by username' },
  { type: 'email', query: 'test@example.com', description: 'Search by email' },
  { type: 'wallet', query: 'celf1234567890', description: 'Search by wallet address' },
  { type: 'partial', query: 'vik', description: 'Partial username search' }
];

async function testUserSearch() {
  console.log('🧪 Testing User Search Functionality\n');

  // Test each query type
  for (const testCase of testQueries) {
    console.log(`\n🔍 ${testCase.description}: "${testCase.query}"`);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/users/search`, {
        params: { q: testCase.query, limit: 5 },
        headers: {
          'Authorization': 'Bearer test-token' // Mock token for testing
        }
      });

      console.log(`✅ Response Status: ${response.status}`);
      console.log(`📊 Response Format:`, {
        success: response.data.success,
        message: response.data.message,
        dataType: Array.isArray(response.data.data) ? 'array' : typeof response.data.data,
        count: Array.isArray(response.data.data) ? response.data.data.length : 'N/A'
      });

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        console.log(`👥 Found ${response.data.data.length} users:`);
        response.data.data.forEach((user, index) => {
          console.log(`   ${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - ${user.walletAddress || 'No wallet'}`);
        });
      } else {
        console.log(`❌ No users found or error: ${response.data.message}`);
      }

    } catch (error) {
      if (error.response) {
        console.log(`❌ API Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`❌ Server not running. Please start the backend server first.`);
        break;
      } else {
        console.log(`❌ Request Error: ${error.message}`);
      }
    }
  }

  console.log('\n🎯 Test Summary:');
  console.log('- If server is running, you should see search results above');
  console.log('- Each response should have success=true and data as an array');
  console.log('- Users should have id, firstName, lastName, email, and walletAddress fields');
  console.log('\n💡 To run this test:');
  console.log('1. Start the backend server: npm start');
  console.log('2. Run this test: node test_user_search_fix.js');
}

// Run the test
testUserSearch().catch(console.error);
