/**
 * Debug Search Functionality
 * This script debugs the user search and wallet address lookup
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Wallet = require('./src/models/Wallet');
const mongodbService = require('./src/services/mongodbService');

async function debugSearch() {
  try {
    console.log('🔍 Debugging Search Functionality...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Test 1: Check users and their IDs
    console.log('\n📋 Test 1: Check Users and IDs');
    const users = await User.find().limit(3);
    
    for (const user of users) {
      console.log(`👤 User: ${user.firstName} ${user.lastName}`);
      console.log(`   _id: ${user._id}`);
      console.log(`   id: ${user.id}`);
      console.log(`   email: ${user.email}`);
    }

    // Test 2: Check wallets and their user IDs
    console.log('\n💰 Test 2: Check Wallets and User IDs');
    const wallets = await Wallet.find().limit(3);
    
    for (const wallet of wallets) {
      console.log(`💰 Wallet: ${wallet.currentAddress?.substring(0, 20)}...`);
      console.log(`   userId: ${wallet.userId}`);
      console.log(`   userId type: ${typeof wallet.userId}`);
    }

    // Test 3: Manual wallet lookup
    if (users.length > 0 && wallets.length > 0) {
      const testUser = users[0];
      console.log(`\n🔍 Test 3: Manual Wallet Lookup for ${testUser.firstName}`);
      console.log(`Looking for wallet with userId: ${testUser._id} (type: ${typeof testUser._id})`);
      
      const userWallet = await Wallet.findOne({ userId: testUser._id });
      console.log(`Found wallet:`, userWallet ? {
        userId: userWallet.userId,
        address: userWallet.currentAddress?.substring(0, 20) + '...'
      } : 'None');
    }

    // Test 4: Search using mongodbService
    console.log('\n🔍 Test 4: Search using mongodbService');
    const searchResults = await mongodbService.searchUsers('victor', 5);
    
    console.log(`📊 Search results: ${searchResults.length} users found`);
    searchResults.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`     Email: ${user.email}`);
      console.log(`     Wallet: ${user.walletAddress || 'NULL'}`);
      console.log(`     User ID: ${user._id || user.id}`);
    });

    // Test 5: Direct wallet query with user IDs from search
    if (searchResults.length > 0) {
      console.log('\n💰 Test 5: Direct Wallet Query');
      const userIds = searchResults.map(user => user._id || user.id);
      console.log(`Looking for wallets with userIds:`, userIds);
      
      const directWallets = await Wallet.find({ userId: { $in: userIds } });
      console.log(`Found ${directWallets.length} wallets directly:`, directWallets.map(w => ({
        userId: w.userId,
        address: w.currentAddress?.substring(0, 20) + '...'
      })));
    }

    console.log('\n✅ Debug completed!');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the debug
debugSearch().catch(console.error);
