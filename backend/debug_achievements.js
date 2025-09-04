/**
 * Debug Achievements API
 * Test the achievements endpoint directly to find the 500 error
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Achievement, UserAchievement } = require('./src/models');

async function debugAchievements() {
  try {
    console.log('🔍 Debugging achievements API...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if achievements exist
    const achievements = await Achievement.find();
    console.log(`📋 Found ${achievements.length} achievements in database`);
    
    if (achievements.length === 0) {
      console.log('❌ No achievements found! Run seed script first.');
      return;
    }

    // List achievements
    console.log('\n📋 Available achievements:');
    achievements.forEach(achievement => {
      console.log(`   ${achievement.achievementId}: ${achievement.title} (${achievement.category})`);
    });

    // Check if we have any users
    const User = require('./src/models/User');
    const users = await User.find().limit(5);
    console.log(`\n👥 Found ${users.length} users in database`);
    
    if (users.length === 0) {
      console.log('❌ No users found! Create a user account first.');
      return;
    }

    // Test with first user
    const testUser = users[0];
    console.log(`\n🧪 Testing with user: ${testUser.email} (ID: ${testUser._id})`);

    // Check user achievements
    const userAchievements = await UserAchievement.find({ userId: testUser._id });
    console.log(`📊 User has ${userAchievements.length} achievement records`);

    // Test the service method
    console.log('\n🔧 Testing achievementService.getUserAchievements...');
    const achievementService = require('./src/services/achievementService');
    
    try {
      const result = await achievementService.getUserAchievements(testUser._id);
      console.log(`✅ Service returned ${result.length} achievements`);
      
      if (result.length > 0) {
        console.log('\n📋 Sample achievement:');
        console.log(JSON.stringify(result[0], null, 2));
      }
    } catch (serviceError) {
      console.error('❌ Service error:', serviceError.message);
      console.error('Stack:', serviceError.stack);
    }

    // Test stats
    console.log('\n📊 Testing getUserAchievementStats...');
    try {
      const stats = await achievementService.getUserAchievementStats(testUser._id);
      console.log('✅ Stats:', stats);
    } catch (statsError) {
      console.error('❌ Stats error:', statsError.message);
    }

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
  debugAchievements();
}

module.exports = { debugAchievements };
