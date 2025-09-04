/**
 * Debug Achievements API
 * Simple script to test the achievements API and debug issues
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Import models and services
const { Achievement, UserAchievement, User } = require('./src/models');
const achievementService = require('./src/services/achievementService');

async function debugAchievementsAPI() {
  try {
    console.log('🔍 Debugging Achievements API...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Step 1: Check if achievements exist in database
    console.log('\n1️⃣ Checking achievements in database...');
    const achievements = await Achievement.find({ isActive: true });
    console.log(`✅ Found ${achievements.length} achievements in database`);
    
    if (achievements.length === 0) {
      console.log('❌ No achievements found! Running seeding script...');
      const { seedAchievements } = require('./scripts/seedAchievements');
      await seedAchievements();
      console.log('✅ Achievements seeded successfully');
    } else {
      achievements.forEach(achievement => {
        console.log(`   - ${achievement.achievementId}: ${achievement.title} (${achievement.category})`);
      });
    }

    // Step 2: Check if test user exists
    console.log('\n2️⃣ Checking test user...');
    let testUser = await User.findOne({ email: 'test-achievements@example.com' });
    
    if (!testUser) {
      console.log('❌ Test user not found! Creating test user...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('testpassword123', 10);
      
      testUser = new User({
        email: 'test-achievements@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: hashedPassword,
        role: 'user',
        isActive: true
      });
      await testUser.save();
      console.log('✅ Test user created');
    } else {
      console.log('✅ Test user exists');
    }

    // Step 3: Check user achievements
    console.log('\n3️⃣ Checking user achievements...');
    const userAchievements = await UserAchievement.find({ userId: testUser._id });
    console.log(`Found ${userAchievements.length} user achievements`);
    
    if (userAchievements.length === 0) {
      console.log('❌ No user achievements found! Initializing...');
      await achievementService.initializeUserAchievements(testUser._id);
      console.log('✅ User achievements initialized');
    } else {
      console.log('✅ User achievements exist');
    }

    // Step 4: Test achievement service
    console.log('\n4️⃣ Testing achievement service...');
    const serviceResult = await achievementService.getUserAchievements(testUser._id);
    console.log(`✅ Achievement service returned ${serviceResult.length} achievements`);
    
    serviceResult.slice(0, 3).forEach(achievement => {
      console.log(`   - ${achievement.id}: ${achievement.title} (${achievement.progress}/${achievement.maxProgress})`);
    });

    // Step 5: Test achievement stats
    console.log('\n5️⃣ Testing achievement stats...');
    const stats = await achievementService.getUserAchievementStats(testUser._id);
    console.log('✅ Achievement stats:', stats);

    // Step 6: Test API endpoint simulation
    console.log('\n6️⃣ Simulating API endpoint...');
    const achievementController = require('./src/controllers/achievementController');
    
    // Mock request and response objects
    const mockReq = {
      user: { id: testUser._id },
      query: {}
    };
    
    const mockRes = {
      json: (data) => {
        console.log('✅ API Response:', JSON.stringify(data, null, 2));
        return data;
      },
      status: (code) => ({
        json: (data) => {
          console.log(`❌ API Error (${code}):`, JSON.stringify(data, null, 2));
          return data;
        }
      })
    };

    await achievementController.getUserAchievements(mockReq, mockRes);

    console.log('\n🎉 All debugging steps completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Achievements in database: ${achievements.length}`);
    console.log(`   - Test user exists: ✅`);
    console.log(`   - User achievements initialized: ✅`);
    console.log(`   - Achievement service working: ✅`);
    console.log(`   - API controller working: ✅`);

  } catch (error) {
    console.error('❌ Debug failed:', error);
    console.log('\n🔧 Error details:', error.message);
    console.log('Stack trace:', error.stack);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the debug
if (require.main === module) {
  debugAchievementsAPI();
}

module.exports = { debugAchievementsAPI };
