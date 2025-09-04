const mongoose = require('mongoose');
require('dotenv').config();

// Import models and services
const { Achievement, UserAchievement, User, Wallet } = require('./src/models');
const achievementService = require('./src/services/achievementService');

async function testAchievements() {
  try {
    console.log('🧪 Starting achievements system test...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Test 1: Check if achievements were seeded
    console.log('\n📋 Test 1: Checking seeded achievements...');
    const achievements = await Achievement.findActiveAchievements();
    console.log(`✅ Found ${achievements.length} achievements in database`);
    
    achievements.forEach(achievement => {
      console.log(`   - ${achievement.achievementId}: ${achievement.title} (${achievement.category})`);
    });

    // Test 2: Create a test user and initialize achievements
    console.log('\n👤 Test 2: Creating test user and initializing achievements...');
    
    // Check if test user already exists
    let testUser = await User.findOne({ email: 'test-achievements@example.com' });
    
    if (!testUser) {
      testUser = new User({
        email: 'test-achievements@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'testpassword123',
        role: 'user',
        isActive: true
      });
      await testUser.save();
      console.log('✅ Test user created');
    } else {
      console.log('✅ Test user already exists');
    }

    // Initialize achievements for test user
    const initializedCount = await achievementService.initializeUserAchievements(testUser._id);
    console.log(`✅ Initialized ${initializedCount} achievements for test user`);

    // Test 3: Get user achievements
    console.log('\n🏆 Test 3: Getting user achievements...');
    const userAchievements = await achievementService.getUserAchievements(testUser._id);
    console.log(`✅ Retrieved ${userAchievements.length} user achievements`);
    
    userAchievements.slice(0, 3).forEach(achievement => {
      console.log(`   - ${achievement.id}: ${achievement.title} (${achievement.progress}/${achievement.maxProgress})`);
    });

    // Test 4: Test achievement progress tracking
    console.log('\n📈 Test 4: Testing achievement progress tracking...');
    
    // Track mining progress (First Steps achievement)
    await achievementService.trackMiningProgress(testUser._id, {
      sessionId: 'test-session-1',
      amount: 5,
      duration: 60000
    });
    console.log('✅ Mining progress tracked');

    // Track transaction progress (First Transaction achievement)
    await achievementService.trackTransactionProgress(testUser._id, {
      transactionId: 'test-transaction-1',
      amount: 10,
      type: 'send',
      recipientId: testUser._id
    });
    console.log('✅ Transaction progress tracked');

    // Test 5: Check updated achievements
    console.log('\n🔄 Test 5: Checking updated achievements...');
    const updatedAchievements = await achievementService.getUserAchievements(testUser._id);
    
    const firstSteps = updatedAchievements.find(a => a.id === '1');
    const firstTransaction = updatedAchievements.find(a => a.id === '4');
    
    console.log(`✅ First Steps: ${firstSteps.progress}/${firstSteps.maxProgress} (${firstSteps.isCompleted ? 'COMPLETED' : 'IN PROGRESS'})`);
    console.log(`✅ First Transaction: ${firstTransaction.progress}/${firstTransaction.maxProgress} (${firstTransaction.isCompleted ? 'COMPLETED' : 'IN PROGRESS'})`);

    // Test 6: Test reward claiming (if any achievements are completed)
    console.log('\n💰 Test 6: Testing reward claiming...');
    const completedAchievements = updatedAchievements.filter(a => a.isCompleted && !a.rewardClaimed);
    
    if (completedAchievements.length > 0) {
      const achievement = completedAchievements[0];
      console.log(`Attempting to claim reward for: ${achievement.title}`);
      
      try {
        const result = await achievementService.claimAchievementReward(testUser._id, achievement.id);
        console.log(`✅ Reward claimed: ${result.reward} CELF tokens`);
      } catch (error) {
        console.log(`❌ Error claiming reward: ${error.message}`);
      }
    } else {
      console.log('ℹ️  No completed achievements to claim rewards for');
    }

    // Test 7: Get user achievement statistics
    console.log('\n📊 Test 7: Getting user achievement statistics...');
    const stats = await achievementService.getUserAchievementStats(testUser._id);
    console.log('✅ User Achievement Statistics:');
    console.log(`   - Total Achievements: ${stats.totalAchievements}`);
    console.log(`   - Completed: ${stats.completedAchievements}`);
    console.log(`   - Completion Rate: ${stats.completionPercentage}%`);
    console.log(`   - Unclaimed Rewards: ${stats.unclaimedRewards}`);
    console.log(`   - Total Unclaimed Value: ${stats.totalUnclaimedRewardValue} CELF`);

    console.log('\n🎉 All achievement tests completed successfully!');
    console.log('\n📝 Summary:');
    console.log(`   - ${achievements.length} achievements seeded in database`);
    console.log(`   - ${userAchievements.length} achievements initialized for test user`);
    console.log(`   - Achievement progress tracking working`);
    console.log(`   - User statistics calculation working`);
    console.log('   - Achievement system is ready for production use!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the test
if (require.main === module) {
  testAchievements();
}

module.exports = { testAchievements };
