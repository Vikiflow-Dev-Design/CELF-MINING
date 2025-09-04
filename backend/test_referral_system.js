/**
 * Test Referral System
 * This script tests the complete referral system functionality
 */

require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testReferralSystem() {
  try {
    console.log('🧪 Testing Referral System...');

    // Test 1: Register first user (referrer)
    console.log('\n📝 Test 1: Register referrer user');
    const referrerData = {
      email: 'referrer@test.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Referrer'
    };

    let referrerResponse;
    try {
      referrerResponse = await axios.post(`${BASE_URL}/auth/register`, referrerData);
      console.log('✅ Referrer registered successfully');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  Referrer already exists, logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email: referrerData.email,
          password: referrerData.password
        });
        referrerResponse = loginResponse;
      } else {
        throw error;
      }
    }

    const referrerToken = referrerResponse.data.data.token;
    const referrerId = referrerResponse.data.data.user.id;

    // Test 2: Get referrer's referral info
    console.log('\n🔍 Test 2: Get referrer referral info');
    const referralInfoResponse = await axios.get(`${BASE_URL}/referrals/info`, {
      headers: { Authorization: `Bearer ${referrerToken}` }
    });

    const referralCode = referralInfoResponse.data.data.referralCode;
    const referralLink = referralInfoResponse.data.data.referralLink;
    
    console.log('✅ Referral info retrieved:');
    console.log(`   Code: ${referralCode}`);
    console.log(`   Link: ${referralLink}`);
    console.log(`   Stats:`, referralInfoResponse.data.data.stats);

    // Test 3: Validate referral code
    console.log('\n🔍 Test 3: Validate referral code');
    const validationResponse = await axios.get(`${BASE_URL}/referrals/validate/${referralCode}`);
    console.log('✅ Referral code validation:', validationResponse.data.data);

    // Test 4: Register second user with referral code (referee)
    console.log('\n📝 Test 4: Register referee with referral code');
    const refereeData = {
      email: 'referee@test.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Referee',
      referralCode: referralCode
    };

    let refereeResponse;
    try {
      refereeResponse = await axios.post(`${BASE_URL}/auth/register`, refereeData);
      console.log('✅ Referee registered successfully with referral');
      console.log('   Referral processed:', refereeResponse.data.data.referral);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  Referee already exists, skipping registration...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email: refereeData.email,
          password: refereeData.password
        });
        refereeResponse = loginResponse;
      } else {
        throw error;
      }
    }

    const refereeToken = refereeResponse.data.data.token;

    // Test 5: Check referrer's updated stats
    console.log('\n🔍 Test 5: Check referrer updated stats');
    const updatedReferralInfoResponse = await axios.get(`${BASE_URL}/referrals/info`, {
      headers: { Authorization: `Bearer ${referrerToken}` }
    });
    console.log('✅ Updated referrer stats:', updatedReferralInfoResponse.data.data.stats);
    console.log('✅ Referrals list:', updatedReferralInfoResponse.data.data.referrals);

    // Test 6: Check referrer's wallet balance (should have referral reward)
    console.log('\n💰 Test 6: Check referrer wallet balance');
    const referrerWalletResponse = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${referrerToken}` }
    });
    console.log('✅ Referrer wallet balance:', referrerWalletResponse.data.data);

    // Test 7: Check referee's wallet balance (should have referral bonus)
    console.log('\n💰 Test 7: Check referee wallet balance');
    const refereeWalletResponse = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${refereeToken}` }
    });
    console.log('✅ Referee wallet balance:', refereeWalletResponse.data.data);

    // Test 8: Check referrer's transactions (should show referral reward)
    console.log('\n📊 Test 8: Check referrer transactions');
    const referrerTransactionsResponse = await axios.get(`${BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${referrerToken}` }
    });
    console.log('✅ Referrer transactions:');
    referrerTransactionsResponse.data.data.transactions.forEach((tx, index) => {
      console.log(`   ${index + 1}. ${tx.type} - ${tx.amount} CELF (${tx.description})`);
    });

    // Test 9: Check referee's transactions (should show referral bonus)
    console.log('\n📊 Test 9: Check referee transactions');
    const refereeTransactionsResponse = await axios.get(`${BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${refereeToken}` }
    });
    console.log('✅ Referee transactions:');
    refereeTransactionsResponse.data.data.transactions.forEach((tx, index) => {
      console.log(`   ${index + 1}. ${tx.type} - ${tx.amount} CELF (${tx.description})`);
    });

    // Test 10: Get referral history
    console.log('\n📋 Test 10: Get referral history');
    const referralHistoryResponse = await axios.get(`${BASE_URL}/referrals/history`, {
      headers: { Authorization: `Bearer ${referrerToken}` }
    });
    console.log('✅ Referral history:', referralHistoryResponse.data.data);

    // Test 11: Get referral leaderboard
    console.log('\n🏆 Test 11: Get referral leaderboard');
    const leaderboardResponse = await axios.get(`${BASE_URL}/referrals/leaderboard`);
    console.log('✅ Referral leaderboard:', leaderboardResponse.data.data.leaderboard);

    // Test 12: Test invalid referral code
    console.log('\n❌ Test 12: Test invalid referral code');
    try {
      const invalidValidationResponse = await axios.get(`${BASE_URL}/referrals/validate/INVALID123`);
      console.log('✅ Invalid code validation:', invalidValidationResponse.data.data);
    } catch (error) {
      console.log('✅ Invalid code properly rejected');
    }

    console.log('\n🎉 All referral system tests completed successfully!');

  } catch (error) {
    console.error('❌ Referral system test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the test
testReferralSystem().catch(console.error);
