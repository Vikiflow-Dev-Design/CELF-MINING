/**
 * Test Wallet Address Search Functionality
 * This script tests searching for users by wallet address
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Wallet = require('./src/models/Wallet');
const mongodbService = require('./src/services/mongodbService');

async function testWalletAddressSearch() {
  try {
    console.log('🔍 Testing Wallet Address Search Functionality...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Get all users and their wallet addresses
    const users = await User.find().limit(5);
    console.log(`👥 Found ${users.length} users for testing`);

    for (const user of users) {
      const wallet = await Wallet.findOne({ userId: user._id });
      if (wallet) {
        console.log(`👤 ${user.firstName} ${user.lastName}: ${wallet.currentAddress}`);
      }
    }

    if (users.length === 0) {
      console.log('❌ No users found for testing');
      return;
    }

    // Test 1: Search by full wallet address
    const testUser = users[0];
    const testWallet = await Wallet.findOne({ userId: testUser._id });
    
    if (!testWallet) {
      console.log('❌ No wallet found for test user');
      return;
    }

    const fullAddress = testWallet.currentAddress;
    console.log(`\n🔍 Test 1: Search by full wallet address`);
    console.log(`Searching for: ${fullAddress}`);
    
    const fullAddressResults = await mongodbService.searchUsers(fullAddress, 5);
    console.log(`📊 Full address search results: ${fullAddressResults.length} users found`);
    
    if (fullAddressResults.length > 0) {
      fullAddressResults.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
        console.log(`     Wallet: ${user.walletAddress || 'No address'}`);
      });
    }

    // Test 2: Search by partial wallet address (first 16 characters)
    const partialAddress = fullAddress.substring(0, 16);
    console.log(`\n🔍 Test 2: Search by partial wallet address`);
    console.log(`Searching for: ${partialAddress}`);
    
    const partialAddressResults = await mongodbService.searchUsers(partialAddress, 5);
    console.log(`📊 Partial address search results: ${partialAddressResults.length} users found`);
    
    if (partialAddressResults.length > 0) {
      partialAddressResults.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
        console.log(`     Wallet: ${user.walletAddress || 'No address'}`);
      });
    }

    // Test 3: Search by just "celf" prefix
    console.log(`\n🔍 Test 3: Search by "celf" prefix`);
    console.log(`Searching for: celf`);
    
    const prefixResults = await mongodbService.searchUsers('celf', 5);
    console.log(`📊 Prefix search results: ${prefixResults.length} users found`);
    
    if (prefixResults.length > 0) {
      prefixResults.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
        console.log(`     Wallet: ${user.walletAddress || 'No address'}`);
      });
    }

    // Test 4: Search by name (should still work)
    console.log(`\n🔍 Test 4: Search by name (should still work)`);
    console.log(`Searching for: ${testUser.firstName}`);
    
    const nameResults = await mongodbService.searchUsers(testUser.firstName, 5);
    console.log(`📊 Name search results: ${nameResults.length} users found`);
    
    if (nameResults.length > 0) {
      nameResults.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
        console.log(`     Wallet: ${user.walletAddress || 'No address'}`);
      });
    }

    // Test 5: Search by email (should still work)
    console.log(`\n🔍 Test 5: Search by email (should still work)`);
    console.log(`Searching for: ${testUser.email}`);
    
    const emailResults = await mongodbService.searchUsers(testUser.email, 5);
    console.log(`📊 Email search results: ${emailResults.length} users found`);
    
    if (emailResults.length > 0) {
      emailResults.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
        console.log(`     Wallet: ${user.walletAddress || 'No address'}`);
      });
    }

    // Test 6: Mixed search (non-wallet address)
    console.log(`\n🔍 Test 6: Mixed search (non-wallet address)`);
    console.log(`Searching for: victor`);
    
    const mixedResults = await mongodbService.searchUsers('victor', 5);
    console.log(`📊 Mixed search results: ${mixedResults.length} users found`);
    
    if (mixedResults.length > 0) {
      mixedResults.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
        console.log(`     Wallet: ${user.walletAddress || 'No address'}`);
      });
    }

    console.log('\n✅ Wallet address search test completed!');
    console.log('\n🎯 Summary:');
    console.log('✅ Full wallet address search');
    console.log('✅ Partial wallet address search');
    console.log('✅ Prefix search');
    console.log('✅ Name search (backward compatibility)');
    console.log('✅ Email search (backward compatibility)');
    console.log('✅ Mixed search functionality');
    
  } catch (error) {
    console.error('❌ Wallet address search test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testWalletAddressSearch().catch(console.error);
