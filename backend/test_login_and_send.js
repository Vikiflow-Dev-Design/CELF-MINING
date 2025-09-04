/**
 * Test Login and Token Sending
 * This script tests the complete flow: login -> send tokens
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Wallet = require('./src/models/Wallet');
const jwt = require('jsonwebtoken');
const config = require('./src/config/config');

async function testLoginAndSend() {
  try {
    console.log('🔍 Testing Login and Token Sending...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Get test users
    const users = await User.find().limit(3);
    if (users.length < 2) {
      console.error('❌ Need at least 2 users for testing');
      return;
    }

    const sender = users[0];
    const recipient = users[1];

    console.log(`👤 Sender: ${sender.firstName} ${sender.lastName} (${sender.email})`);
    console.log(`👤 Recipient: ${recipient.firstName} ${recipient.lastName} (${recipient.email})`);

    // Generate a test JWT token for the sender
    const token = jwt.sign(
      { userId: sender._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    console.log(`🔑 Generated test token for ${sender.email}`);
    console.log(`🔑 Token: ${token.substring(0, 20)}...`);

    // Get sender wallet
    const senderWallet = await Wallet.findOne({ userId: sender._id });
    const recipientWallet = await Wallet.findOne({ userId: recipient._id });

    if (!senderWallet || !recipientWallet) {
      console.error('❌ Missing wallets for test users');
      return;
    }

    console.log(`💰 Sender wallet: ${senderWallet.sendableBalance} CELF sendable`);
    console.log(`💰 Recipient wallet: ${recipientWallet.sendableBalance} CELF sendable`);
    console.log(`📍 Recipient address: ${recipientWallet.currentAddress}`);

    // Ensure sender has enough balance
    const testAmount = 5;
    if (senderWallet.sendableBalance < testAmount) {
      console.log(`💰 Adding balance to sender for testing...`);
      senderWallet.sendableBalance += 50;
      senderWallet.totalBalance = senderWallet.sendableBalance + senderWallet.nonSendableBalance + senderWallet.pendingBalance;
      await senderWallet.save();
      console.log(`✅ Updated sender balance: ${senderWallet.sendableBalance} CELF sendable`);
    }

    // Test the API endpoint by simulating the request
    console.log(`\n🚀 Testing send tokens API endpoint...`);
    
    // Simulate the API request data
    const requestData = {
      toAddress: recipientWallet.currentAddress,
      amount: testAmount,
      description: 'Test transfer via API'
    };

    console.log(`📡 Request data:`, requestData);
    console.log(`🔑 Using token for user: ${sender._id}`);

    // Import the wallet controller to test directly
    const walletController = require('./src/controllers/walletController');
    const { createResponse } = require('./src/utils/responseUtils');

    // Mock request and response objects
    const mockReq = {
      user: {
        userId: sender._id,
        email: sender.email,
        role: sender.role
      },
      body: requestData
    };

    let responseData = null;
    let responseStatus = 200;

    const mockRes = {
      status: (code) => {
        responseStatus = code;
        return mockRes;
      },
      json: (data) => {
        responseData = data;
        return mockRes;
      }
    };

    const mockNext = (error) => {
      if (error) {
        console.error('❌ Controller error:', error);
        responseStatus = 500;
        responseData = createResponse(false, error.message);
      }
    };

    // Call the controller method
    console.log(`🎯 Calling walletController.sendTokens...`);
    await walletController.sendTokens(mockReq, mockRes, mockNext);

    console.log(`\n📊 API Response:`);
    console.log(`   Status: ${responseStatus}`);
    console.log(`   Data:`, responseData);

    if (responseData && responseData.success) {
      console.log(`\n✅ Token transfer successful!`);
      console.log(`   Transaction ID: ${responseData.data.transaction.id}`);
      console.log(`   Recipient: ${responseData.data.recipient.name}`);
      
      // Verify balances were updated
      const updatedSenderWallet = await Wallet.findOne({ userId: sender._id });
      const updatedRecipientWallet = await Wallet.findOne({ userId: recipient._id });
      
      console.log(`\n💰 Updated balances:`);
      console.log(`   Sender: ${senderWallet.sendableBalance} → ${updatedSenderWallet.sendableBalance} CELF`);
      console.log(`   Recipient: ${recipientWallet.sendableBalance} → ${updatedRecipientWallet.sendableBalance} CELF`);
      
    } else {
      console.log(`\n❌ Token transfer failed!`);
      if (responseData) {
        console.log(`   Error: ${responseData.message}`);
      }
    }

    console.log('\n✅ Login and send test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testLoginAndSend().catch(console.error);
