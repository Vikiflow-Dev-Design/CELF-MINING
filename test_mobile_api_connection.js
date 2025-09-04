/**
 * Test Mobile App API Connection
 * Simple test to verify the mobile app can connect to the achievements API
 */

const fetch = require('node-fetch');

// Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Test user credentials (you can create a test user or use existing one)
const TEST_USER = {
  email: 'test-achievements@example.com',
  password: 'testpassword123'
};

async function testAchievementsAPI() {
  try {
    console.log('🧪 Testing Mobile App API Connection...\n');

    // Step 1: Login to get authentication token
    console.log('1️⃣ Testing user login...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password
      })
    });

    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      throw new Error(`Login failed: ${loginData.message}`);
    }

    const authToken = loginData.data.token;
    console.log('✅ Login successful, token received');

    // Step 2: Test achievements endpoint
    console.log('\n2️⃣ Testing achievements endpoint...');
    const achievementsResponse = await fetch(`${API_BASE_URL}/achievements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    const achievementsData = await achievementsResponse.json();
    
    if (!achievementsData.success) {
      throw new Error(`Achievements fetch failed: ${achievementsData.message}`);
    }

    console.log('✅ Achievements fetched successfully');
    console.log(`   - Total achievements: ${achievementsData.data.achievements.length}`);
    console.log(`   - Categories: ${achievementsData.data.categories.length}`);
    console.log(`   - User stats:`, achievementsData.data.stats);

    // Step 3: Test specific achievement details
    console.log('\n3️⃣ Testing achievement details endpoint...');
    if (achievementsData.data.achievements.length > 0) {
      const firstAchievement = achievementsData.data.achievements[0];
      const detailsResponse = await fetch(`${API_BASE_URL}/achievements/${firstAchievement.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });

      const detailsData = await detailsResponse.json();
      
      if (!detailsData.success) {
        throw new Error(`Achievement details fetch failed: ${detailsData.message}`);
      }

      console.log('✅ Achievement details fetched successfully');
      console.log(`   - Achievement: ${detailsData.data.title}`);
      console.log(`   - Progress: ${detailsData.data.progress}/${detailsData.data.maxProgress}`);
      console.log(`   - Completed: ${detailsData.data.isCompleted}`);
      console.log(`   - Reward claimed: ${detailsData.data.rewardClaimed}`);
    }

    // Step 4: Test achievement stats endpoint
    console.log('\n4️⃣ Testing achievement stats endpoint...');
    const statsResponse = await fetch(`${API_BASE_URL}/achievements/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    const statsData = await statsResponse.json();
    
    if (!statsData.success) {
      throw new Error(`Achievement stats fetch failed: ${statsData.message}`);
    }

    console.log('✅ Achievement stats fetched successfully');
    console.log('   - Stats:', statsData.data);

    // Step 5: Test category filtering
    console.log('\n5️⃣ Testing category filtering...');
    const miningResponse = await fetch(`${API_BASE_URL}/achievements?category=mining`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    const miningData = await miningResponse.json();
    
    if (!miningData.success) {
      throw new Error(`Mining achievements fetch failed: ${miningData.message}`);
    }

    console.log('✅ Category filtering working');
    console.log(`   - Mining achievements: ${miningData.data.achievements.length}`);

    // Summary
    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📱 Mobile App Integration Ready:');
    console.log('   ✅ Authentication working');
    console.log('   ✅ Achievements endpoint working');
    console.log('   ✅ Achievement details endpoint working');
    console.log('   ✅ Achievement stats endpoint working');
    console.log('   ✅ Category filtering working');
    console.log('\n🚀 The mobile app can now fetch achievements from the backend API!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure the backend server is running (npm run dev)');
    console.log('   2. Check if the test user exists in the database');
    console.log('   3. Verify the API base URL is correct');
    console.log('   4. Ensure achievements have been seeded in the database');
  }
}

// Run the test
if (require.main === module) {
  testAchievementsAPI();
}

module.exports = { testAchievementsAPI };
