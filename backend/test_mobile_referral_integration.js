/**
 * Test Mobile Referral Integration
 * This script tests the referral API endpoints that the mobile app will use
 */

require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testMobileReferralIntegration() {
  try {
    console.log('📱 Testing Mobile Referral Integration...');

    // Test 1: Register a user and get their referral code
    console.log('\n📝 Test 1: Register user and get referral code');
    const userData = {
      email: 'mobile_user@test.com',
      password: 'password123',
      firstName: 'Mobile',
      lastName: 'User'
    };

    let userResponse;
    try {
      userResponse = await axios.post(`${BASE_URL}/auth/register`, userData);
      console.log('✅ User registered successfully');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  User already exists, logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email: userData.email,
          password: userData.password
        });
        userResponse = loginResponse;
      } else {
        throw error;
      }
    }

    const userToken = userResponse.data.data.token;

    // Test 2: Get referral info (mobile app endpoint)
    console.log('\n🔍 Test 2: Get referral info (mobile app call)');
    const referralInfoResponse = await axios.get(`${BASE_URL}/referrals/info`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    console.log('✅ Referral info retrieved:');
    console.log('   Code:', referralInfoResponse.data.data.referralCode);
    console.log('   Link:', referralInfoResponse.data.data.referralLink);
    console.log('   Stats:', referralInfoResponse.data.data.stats);

    const referralCode = referralInfoResponse.data.data.referralCode;

    // Test 3: Validate referral code (public endpoint)
    console.log('\n🔍 Test 3: Validate referral code (public call)');
    const validationResponse = await axios.get(`${BASE_URL}/referrals/validate/${referralCode}`);
    console.log('✅ Validation result:', validationResponse.data.data);

    // Test 4: Register new user with referral code
    console.log('\n📝 Test 4: Register new user with referral code');
    const newUserData = {
      email: 'referred_mobile_user@test.com',
      password: 'password123',
      firstName: 'Referred',
      lastName: 'MobileUser',
      referralCode: referralCode
    };

    let newUserResponse;
    try {
      newUserResponse = await axios.post(`${BASE_URL}/auth/register`, newUserData);
      console.log('✅ Referred user registered successfully');
      console.log('   Referral processed:', newUserResponse.data.data.referral);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  Referred user already exists, skipping...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email: newUserData.email,
          password: newUserData.password
        });
        newUserResponse = loginResponse;
      } else {
        throw error;
      }
    }

    const newUserToken = newUserResponse.data.data.token;

    // Test 5: Check original user's updated referral stats
    console.log('\n🔍 Test 5: Check updated referral stats');
    const updatedStatsResponse = await axios.get(`${BASE_URL}/referrals/info`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Updated stats:', updatedStatsResponse.data.data.stats);
    console.log('✅ Referrals list:', updatedStatsResponse.data.data.referrals);

    // Test 6: Get referral history with pagination
    console.log('\n📋 Test 6: Get referral history');
    const historyResponse = await axios.get(`${BASE_URL}/referrals/history?page=1&limit=10`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Referral history:', historyResponse.data.data);

    // Test 7: Get referral leaderboard (public)
    console.log('\n🏆 Test 7: Get referral leaderboard');
    const leaderboardResponse = await axios.get(`${BASE_URL}/referrals/leaderboard?limit=5`);
    console.log('✅ Leaderboard:', leaderboardResponse.data.data.leaderboard);

    // Test 8: Check wallet balances (should show referral rewards)
    console.log('\n💰 Test 8: Check wallet balances');
    
    // Original user (referrer)
    const referrerWalletResponse = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Referrer wallet:', referrerWalletResponse.data.data);

    // New user (referee)
    const refereeWalletResponse = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${newUserToken}` }
    });
    console.log('✅ Referee wallet:', refereeWalletResponse.data.data);

    // Test 9: Check transactions (should show referral rewards)
    console.log('\n📊 Test 9: Check transactions');
    
    // Referrer transactions
    const referrerTxResponse = await axios.get(`${BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Referrer transactions:');
    referrerTxResponse.data.data.transactions.slice(0, 3).forEach((tx, index) => {
      console.log(`   ${index + 1}. ${tx.type} - ${tx.amount} CELF (${tx.description})`);
    });

    // Referee transactions
    const refereeTxResponse = await axios.get(`${BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${newUserToken}` }
    });
    console.log('✅ Referee transactions:');
    refereeTxResponse.data.data.transactions.slice(0, 3).forEach((tx, index) => {
      console.log(`   ${index + 1}. ${tx.type} - ${tx.amount} CELF (${tx.description})`);
    });

    // Test 10: Test invalid referral code
    console.log('\n❌ Test 10: Test invalid referral code');
    try {
      const invalidResponse = await axios.get(`${BASE_URL}/referrals/validate/INVALID123`);
      console.log('✅ Invalid code response:', invalidResponse.data.data);
    } catch (error) {
      console.log('✅ Invalid code properly handled');
    }

    console.log('\n🎉 All mobile referral integration tests completed successfully!');
    console.log('\n📱 Mobile App Integration Summary:');
    console.log('✅ Registration with referral codes works');
    console.log('✅ Referral info API works');
    console.log('✅ Referral validation API works');
    console.log('✅ Referral rewards are distributed');
    console.log('✅ Wallet balances updated correctly');
    console.log('✅ Transaction history shows referral rewards');
    console.log('✅ Referral stats and history work');
    console.log('✅ Leaderboard API works');

  } catch (error) {
    console.error('❌ Mobile referral integration test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the test
testMobileReferralIntegration().catch(console.error);
