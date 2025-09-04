/**
 * Create Test Users for Search Functionality
 * This script creates sample users with wallets for testing the search feature
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Wallet = require('./src/models/Wallet');

// Test users data
const testUsers = [
  {
    email: 'alice.johnson@example.com',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'user',
    isActive: true
  },
  {
    email: 'bob.smith@example.com',
    firstName: 'Bob',
    lastName: 'Smith',
    role: 'user',
    isActive: true
  },
  {
    email: 'charlie.brown@example.com',
    firstName: 'Charlie',
    lastName: 'Brown',
    role: 'user',
    isActive: true
  },
  {
    email: 'diana.prince@example.com',
    firstName: 'Diana',
    lastName: 'Prince',
    role: 'user',
    isActive: true
  },
  {
    email: 'edward.norton@example.com',
    firstName: 'Edward',
    lastName: 'Norton',
    role: 'user',
    isActive: true
  },
  {
    email: 'fiona.green@example.com',
    firstName: 'Fiona',
    lastName: 'Green',
    role: 'user',
    isActive: true
  },
  {
    email: 'george.wilson@example.com',
    firstName: 'George',
    lastName: 'Wilson',
    role: 'user',
    isActive: true
  },
  {
    email: 'helen.davis@example.com',
    firstName: 'Helen',
    lastName: 'Davis',
    role: 'user',
    isActive: true
  }
];

function generateWalletAddress() {
  const chars = 'abcdef0123456789';
  let address = 'celf';
  for (let i = 0; i < 40; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

async function createTestUsers() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB successfully');

    // Check existing users
    const existingCount = await User.countDocuments();
    console.log(`📊 Existing users in database: ${existingCount}`);

    let createdCount = 0;
    let skippedCount = 0;

    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
          console.log(`⏭️  User ${userData.email} already exists, skipping...`);
          skippedCount++;
          continue;
        }

        // Create user
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created user: ${user.firstName} ${user.lastName} (${user.email})`);

        // Create wallet for user
        const walletAddress = generateWalletAddress();
        const wallet = new Wallet({
          userId: user._id,
          sendableBalance: Math.floor(Math.random() * 1000) + 100, // Random balance 100-1100
          nonSendableBalance: Math.floor(Math.random() * 500) + 50, // Random balance 50-550
          currentAddress: walletAddress,
          addresses: [{
            address: walletAddress,
            label: 'Primary Wallet',
            isDefault: true
          }]
        });
        
        await wallet.save();
        console.log(`💰 Created wallet for ${user.firstName}: ${walletAddress}`);
        
        createdCount++;
        
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Created: ${createdCount} users`);
    console.log(`⏭️  Skipped: ${skippedCount} users (already exist)`);
    console.log(`📊 Total users now: ${await User.countDocuments()}`);
    console.log(`💰 Total wallets now: ${await Wallet.countDocuments()}`);

    // Test search functionality with new users
    console.log('\n🔍 Testing search functionality...');
    
    const searchTests = ['alice', 'bob', 'charlie', 'johnson', 'smith', '@example.com'];
    
    for (const query of searchTests) {
      const results = await User.find({
        $or: [
          { firstName: new RegExp(query, 'i') },
          { lastName: new RegExp(query, 'i') },
          { email: new RegExp(query, 'i') }
        ],
        isActive: true
      }).limit(5);
      
      console.log(`🔍 Search "${query}": ${results.length} results`);
      results.forEach(user => {
        console.log(`  - ${user.firstName} ${user.lastName} (${user.email})`);
      });
    }

    console.log('\n✅ Test users created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating test users:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createTestUsers().catch(console.error);
