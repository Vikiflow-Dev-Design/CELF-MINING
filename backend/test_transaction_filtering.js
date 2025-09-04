/**
 * Test Transaction Filtering
 * This script checks transaction filtering and user associations
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Transaction = require('./src/models/Transaction');

async function testTransactionFiltering() {
  try {
    console.log('🔍 Testing Transaction Filtering...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Get all users
    const users = await User.find();
    console.log(`👥 Found ${users.length} users:`);
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - ID: ${user._id}`);
    });

    // Get all transactions
    const allTransactions = await Transaction.find()
      .populate('fromUserId', 'firstName lastName email')
      .populate('toUserId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    console.log(`\n📊 Found ${allTransactions.length} total transactions:`);
    allTransactions.forEach((tx, index) => {
      console.log(`\n  ${index + 1}. ${tx.type.toUpperCase()} - ${tx.amount} CELF (${tx.status})`);
      console.log(`     From User ID: ${tx.fromUserId?._id || 'None'} (${tx.fromUserId?.firstName || 'Unknown'} ${tx.fromUserId?.lastName || ''})`);
      console.log(`     To User ID: ${tx.toUserId?._id || 'None'} (${tx.toUserId?.firstName || 'Unknown'} ${tx.toUserId?.lastName || ''})`);
      console.log(`     Description: ${tx.description}`);
      console.log(`     Created: ${tx.createdAt}`);
    });

    // Test filtering for each user
    for (const user of users) {
      console.log(`\n🔍 Testing transactions for ${user.firstName} ${user.lastName} (${user._id}):`);
      
      const userTransactions = await Transaction.find({
        $or: [{ fromUserId: user._id }, { toUserId: user._id }]
      })
        .populate('fromUserId', 'firstName lastName')
        .populate('toUserId', 'firstName lastName')
        .sort({ createdAt: -1 });

      console.log(`📊 Found ${userTransactions.length} transactions for this user:`);
      userTransactions.forEach((tx, index) => {
        console.log(`  ${index + 1}. ${tx.type} - ${tx.amount} CELF`);
        console.log(`     From: ${tx.fromUserId?.firstName || 'Unknown'} ${tx.fromUserId?.lastName || ''}`);
        console.log(`     To: ${tx.toUserId?.firstName || 'Unknown'} ${tx.toUserId?.lastName || ''}`);
        console.log(`     Description: ${tx.description}`);
      });
    }

    // Check for transactions with missing user associations
    console.log('\n🔍 Checking for transactions with missing user associations:');
    const orphanTransactions = await Transaction.find({
      $and: [
        { type: { $in: ['send', 'receive'] } }, // Only check send/receive transactions
        {
          $or: [
            { fromUserId: null },
            { toUserId: null },
            { fromUserId: { $exists: false } },
            { toUserId: { $exists: false } }
          ]
        }
      ]
    });

    if (orphanTransactions.length > 0) {
      console.log(`⚠️  Found ${orphanTransactions.length} transactions with missing user associations:`);
      orphanTransactions.forEach((tx, index) => {
        console.log(`  ${index + 1}. ${tx.type} - ${tx.amount} CELF`);
        console.log(`     From User ID: ${tx.fromUserId || 'MISSING'}`);
        console.log(`     To User ID: ${tx.toUserId || 'MISSING'}`);
        console.log(`     Description: ${tx.description}`);
      });
    } else {
      console.log('✅ All send/receive transactions have proper user associations');
    }

    console.log('\n✅ Transaction filtering test completed!');
    
  } catch (error) {
    console.error('❌ Transaction filtering test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testTransactionFiltering().catch(console.error);
