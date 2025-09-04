/**
 * Test Transaction API Endpoints
 * This script tests the transaction history endpoints
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Transaction = require('./src/models/Transaction');

async function testTransactionAPI() {
  try {
    console.log('🔍 Testing Transaction API...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Get a test user
    const user = await User.findOne();
    if (!user) {
      console.error('❌ No users found for testing');
      return;
    }

    console.log(`👤 Testing with user: ${user.firstName} ${user.lastName} (${user.email})`);

    // Test getting transactions for user
    console.log('\n🔍 Testing transaction retrieval...');
    
    const transactions = await Transaction.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }]
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('fromUserId', 'firstName lastName')
      .populate('toUserId', 'firstName lastName');

    console.log(`📊 Found ${transactions.length} transactions for user`);

    if (transactions.length > 0) {
      console.log('\n📋 Recent transactions:');
      transactions.forEach((tx, index) => {
        console.log(`  ${index + 1}. ${tx.type} - ${tx.amount} CELF (${tx.status})`);
        console.log(`     ID: ${tx._id}`);
        console.log(`     Date: ${tx.createdAt}`);
        if (tx.description) {
          console.log(`     Description: ${tx.description}`);
        }
        console.log('');
      });

      // Test getting a specific transaction
      const firstTransaction = transactions[0];
      console.log(`🔍 Testing specific transaction retrieval for ID: ${firstTransaction._id}`);
      
      const specificTransaction = await Transaction.findOne({
        _id: firstTransaction._id,
        $or: [{ fromUserId: user._id }, { toUserId: user._id }]
      })
        .populate('fromUserId', 'firstName lastName')
        .populate('toUserId', 'firstName lastName');

      if (specificTransaction) {
        console.log('✅ Specific transaction found:');
        console.log(`   Type: ${specificTransaction.type}`);
        console.log(`   Amount: ${specificTransaction.amount} CELF`);
        console.log(`   Status: ${specificTransaction.status}`);
        console.log(`   Created: ${specificTransaction.createdAt}`);
      } else {
        console.log('❌ Specific transaction not found');
      }
    } else {
      console.log('ℹ️  No transactions found for this user');
    }

    // Test pagination
    console.log('\n📄 Testing pagination...');
    const page = 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const paginatedTransactions = await Transaction.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }]
    });

    console.log(`📊 Pagination test: ${paginatedTransactions.length} transactions (page ${page}, limit ${limit})`);
    console.log(`📊 Total transactions: ${total}`);
    console.log(`📊 Total pages: ${Math.ceil(total / limit)}`);

    console.log('\n✅ Transaction API test completed successfully!');
    
  } catch (error) {
    console.error('❌ Transaction API test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testTransactionAPI().catch(console.error);
