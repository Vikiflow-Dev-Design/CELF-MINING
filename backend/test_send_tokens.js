/**
 * Test Token Sending API
 * This script tests the token sending functionality
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Wallet = require('./src/models/Wallet');
const Transaction = require('./src/models/Transaction');

async function testTokenSending() {
  try {
    console.log('🔍 Testing Token Sending API...');
    
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

    // Get their wallets
    const senderWallet = await Wallet.findOne({ userId: sender._id });
    const recipientWallet = await Wallet.findOne({ userId: recipient._id });

    if (!senderWallet || !recipientWallet) {
      console.error('❌ Missing wallets for test users');
      return;
    }

    console.log(`💰 Sender wallet: ${senderWallet.sendableBalance} CELF sendable`);
    console.log(`💰 Recipient wallet: ${recipientWallet.sendableBalance} CELF sendable`);

    // Ensure sender has enough balance for testing
    const testAmount = 10;
    if (senderWallet.sendableBalance < testAmount) {
      console.log(`💰 Adding balance to sender for testing...`);
      senderWallet.sendableBalance += 100;
      senderWallet.totalBalance = senderWallet.sendableBalance + senderWallet.nonSendableBalance + senderWallet.pendingBalance;
      await senderWallet.save();
      console.log(`✅ Updated sender balance: ${senderWallet.sendableBalance} CELF sendable`);
    }

    // Test token sending logic (simulating the API endpoint)
    console.log(`\n🚀 Testing token transfer: ${testAmount} CELF`);
    
    const initialSenderBalance = senderWallet.sendableBalance;
    const initialRecipientBalance = recipientWallet.sendableBalance;

    // Create sender transaction (debit)
    const senderTransaction = new Transaction({
      fromUserId: sender._id,
      toUserId: recipient._id,
      toAddress: recipientWallet.currentAddress,
      amount: testAmount,
      type: 'send',
      status: 'completed',
      description: `Test transfer to ${recipient.firstName} ${recipient.lastName}`,
      fee: 0
    });
    await senderTransaction.save();

    // Create recipient transaction (credit)
    const recipientTransaction = new Transaction({
      fromUserId: sender._id,
      toUserId: recipient._id,
      toAddress: recipientWallet.currentAddress,
      amount: testAmount,
      type: 'receive',
      status: 'completed',
      description: `Test transfer from ${sender.firstName} ${sender.lastName}`,
      fee: 0
    });
    await recipientTransaction.save();

    // Update sender wallet (deduct from sendable balance)
    const newSenderSendableBalance = senderWallet.sendableBalance - testAmount;
    senderWallet.sendableBalance = newSenderSendableBalance;
    senderWallet.totalBalance = newSenderSendableBalance + senderWallet.nonSendableBalance + senderWallet.pendingBalance;
    senderWallet.totalSent = (senderWallet.totalSent || 0) + testAmount;
    senderWallet.lastActivity = new Date();
    await senderWallet.save();

    // Update recipient wallet (add to sendable balance)
    const newRecipientSendableBalance = recipientWallet.sendableBalance + testAmount;
    recipientWallet.sendableBalance = newRecipientSendableBalance;
    recipientWallet.totalBalance = newRecipientSendableBalance + recipientWallet.nonSendableBalance + recipientWallet.pendingBalance;
    recipientWallet.totalReceived = (recipientWallet.totalReceived || 0) + testAmount;
    recipientWallet.lastActivity = new Date();
    await recipientWallet.save();

    console.log(`\n✅ Token transfer completed!`);
    console.log(`📊 Sender balance: ${initialSenderBalance} → ${newSenderSendableBalance} CELF`);
    console.log(`📊 Recipient balance: ${initialRecipientBalance} → ${newRecipientSendableBalance} CELF`);
    console.log(`📝 Sender transaction ID: ${senderTransaction._id}`);
    console.log(`📝 Recipient transaction ID: ${recipientTransaction._id}`);

    // Verify transactions were created
    const senderTransactions = await Transaction.find({ fromUserId: sender._id }).sort({ createdAt: -1 }).limit(1);
    const recipientTransactions = await Transaction.find({ toUserId: recipient._id }).sort({ createdAt: -1 }).limit(1);

    console.log(`\n📋 Recent sender transactions: ${senderTransactions.length}`);
    console.log(`📋 Recent recipient transactions: ${recipientTransactions.length}`);

    if (senderTransactions.length > 0) {
      const tx = senderTransactions[0];
      console.log(`   Last send: ${tx.amount} CELF to ${tx.toAddress} (${tx.status})`);
    }

    if (recipientTransactions.length > 0) {
      const tx = recipientTransactions[0];
      console.log(`   Last receive: ${tx.amount} CELF from ${tx.fromUserId} (${tx.status})`);
    }

    console.log('\n✅ Token sending test completed successfully!');
    
  } catch (error) {
    console.error('❌ Token sending test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testTokenSending().catch(console.error);
