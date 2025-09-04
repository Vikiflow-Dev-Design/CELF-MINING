/**
 * Debug Users Script
 * Check what users exist in the database
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('./src/models');

async function debugUsers() {
  try {
    console.log('🔍 Debugging users in database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all users
    const users = await User.find().select('_id email firstName lastName clerkId profile createdAt');
    console.log(`👥 Found ${users.length} users in database`);

    if (users.length === 0) {
      console.log('❌ No users found in database!');
      return;
    }

    // Display user information
    console.log('\n📋 Users in database:');
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. User:`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.firstName} ${user.lastName}`);
      console.log(`   Clerk ID: ${user.clerkId || 'None'}`);
      console.log(`   Profile Username: ${user.profile?.username || 'None'}`);
      console.log(`   Created: ${user.createdAt}`);
    });

    console.log('\n🎉 User debugging completed!');
    
  } catch (error) {
    console.error('❌ Debug error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run debug
if (require.main === module) {
  debugUsers();
}

module.exports = { debugUsers };
