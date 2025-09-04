/**
 * Test Database Connection and User Search
 * This script tests the MongoDB connection and user search functionality
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Wallet = require('./src/models/Wallet');

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Test connection with ping
    await mongoose.connection.db.admin().ping();
    console.log('✅ MongoDB ping successful');

    // Check existing users
    const userCount = await User.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);

    if (userCount > 0) {
      const users = await User.find().limit(5).select('email firstName lastName');
      console.log('👥 Sample users:');
      users.forEach(user => {
        console.log(`  - ${user.firstName} ${user.lastName} (${user.email})`);
      });
    }

    // Check wallets
    const walletCount = await Wallet.countDocuments();
    console.log(`💰 Total wallets in database: ${walletCount}`);

    // Test search functionality
    console.log('\n🔍 Testing search functionality...');
    
    if (userCount > 0) {
      // Test search with existing user
      const firstUser = await User.findOne();
      if (firstUser) {
        console.log(`🔍 Testing search for: ${firstUser.firstName}`);
        
        const searchResults = await User.find({
          $or: [
            { firstName: new RegExp(firstUser.firstName, 'i') },
            { lastName: new RegExp(firstUser.firstName, 'i') },
            { email: new RegExp(firstUser.firstName, 'i') }
          ],
          isActive: true
        }).limit(5);
        
        console.log(`✅ Search returned ${searchResults.length} results`);
      }
    }

    console.log('\n✅ Database connection test completed successfully');
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testDatabaseConnection().catch(console.error);
