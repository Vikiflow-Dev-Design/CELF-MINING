/**
 * Test Tasks API
 * Quick test of the tasks functionality
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Task, UserTask, User } = require('./src/models');

async function testTasks() {
  try {
    console.log('🧪 Testing tasks...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check tasks
    const tasks = await Task.find();
    console.log(`📋 Found ${tasks.length} tasks in database`);

    // Check users
    const users = await User.find().limit(1);
    console.log(`👥 Found ${users.length} users`);

    if (users.length > 0) {
      const testUser = users[0];
      console.log(`🧪 Testing with user: ${testUser.email}`);

      // Check if UserTask model works
      const userTasks = await UserTask.find({ userId: testUser._id });
      console.log(`📊 User has ${userTasks.length} task records`);

      // Test creating a user task
      if (tasks.length > 0 && userTasks.length === 0) {
        console.log('🔄 Creating test user task...');
        const testTask = tasks[0];
        
        const newUserTask = new UserTask({
          userId: testUser._id,
          taskId: testTask._id,
          taskKey: testTask.taskId,
          progress: 0,
          isCompleted: false
        });

        await newUserTask.save();
        console.log('✅ Test user task created successfully');
      }
    }

    console.log('\n🎉 Task test completed!');
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run test
if (require.main === module) {
  testTasks();
}

module.exports = { testTasks };
