/**
 * Seed Tasks Script
 * Populates the database with initial tasks
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../src/models/Task');

// Sample tasks data
const tasksData = [
  // Mining Tasks
  {
    taskId: "1",
    title: "First Mining Session",
    description: "Complete your first mining session to get started",
    category: "mining",
    maxProgress: 1,
    reward: 10,
    icon: "diamond",
    tips: ["Tap the mining button to start your first session", "Mining sessions help you earn CELF tokens"],
    requirements: ["Complete 1 mining session"],
    trackingType: "automatic",
    conditions: {
      miningSessionsRequired: 1
    },
    sortOrder: 1
  },
  {
    taskId: "2", 
    title: "Daily Miner",
    description: "Complete 5 mining sessions",
    category: "mining",
    maxProgress: 5,
    reward: 25,
    icon: "flash",
    tips: ["Keep mining regularly to reach this milestone"],
    requirements: ["Complete 5 mining sessions"],
    trackingType: "automatic",
    conditions: {
      miningSessionsRequired: 5
    },
    sortOrder: 2
  },
  {
    taskId: "3",
    title: "Mining Expert",
    description: "Complete 25 mining sessions",
    category: "mining", 
    maxProgress: 25,
    reward: 100,
    icon: "trophy",
    tips: ["Consistency is key to becoming a mining expert"],
    requirements: ["Complete 25 mining sessions"],
    trackingType: "automatic",
    conditions: {
      miningSessionsRequired: 25
    },
    sortOrder: 3
  },

  // Social Tasks
  {
    taskId: "4",
    title: "Share the Love",
    description: "Refer your first friend to CELF",
    category: "social",
    maxProgress: 1,
    reward: 20,
    icon: "people",
    tips: ["Share your referral code with friends"],
    requirements: ["Refer 1 friend"],
    trackingType: "automatic",
    conditions: {
      referralsRequired: 1
    },
    sortOrder: 4
  },
  {
    taskId: "5",
    title: "Community Builder",
    description: "Refer 3 friends to CELF",
    category: "social",
    maxProgress: 3,
    reward: 75,
    icon: "share",
    tips: ["Build your network by inviting more friends"],
    requirements: ["Refer 3 friends"],
    trackingType: "automatic", 
    conditions: {
      referralsRequired: 3
    },
    sortOrder: 5
  },

  // Wallet Tasks
  {
    taskId: "6",
    title: "First Transaction",
    description: "Make your first token transaction",
    category: "wallet",
    maxProgress: 1,
    reward: 15,
    icon: "card",
    tips: ["Send or receive tokens to unlock this task"],
    requirements: ["Complete 1 transaction"],
    trackingType: "automatic",
    conditions: {
      transactionsRequired: 1
    },
    sortOrder: 6
  },
  {
    taskId: "7",
    title: "Token Holder",
    description: "Hold 50 CELF tokens in your wallet",
    category: "wallet",
    maxProgress: 50,
    reward: 30,
    icon: "wallet",
    tips: ["Accumulate tokens through mining and transactions"],
    requirements: ["Hold 50 CELF tokens"],
    trackingType: "automatic",
    conditions: {
      balanceRequired: 50
    },
    sortOrder: 7
  },

  // Milestone Tasks
  {
    taskId: "8",
    title: "Getting Started",
    description: "Earn your first 5 CELF tokens",
    category: "milestone",
    maxProgress: 5,
    reward: 10,
    icon: "star",
    tips: ["Mine tokens or complete tasks to reach this milestone"],
    requirements: ["Earn 5 CELF tokens"],
    trackingType: "automatic",
    conditions: {
      totalTokensRequired: 5
    },
    sortOrder: 8
  },
  {
    taskId: "9",
    title: "Token Collector",
    description: "Earn 100 CELF tokens total",
    category: "milestone",
    maxProgress: 100,
    reward: 50,
    icon: "diamond",
    tips: ["Keep mining and completing tasks to reach this milestone"],
    requirements: ["Earn 100 CELF tokens"],
    trackingType: "automatic",
    conditions: {
      totalTokensRequired: 100
    },
    sortOrder: 9
  },
  {
    taskId: "10",
    title: "CELF Champion",
    description: "Earn 500 CELF tokens total",
    category: "milestone",
    maxProgress: 500,
    reward: 200,
    icon: "trophy",
    tips: ["The ultimate milestone for dedicated users"],
    requirements: ["Earn 500 CELF tokens"],
    trackingType: "automatic",
    conditions: {
      totalTokensRequired: 500
    },
    sortOrder: 10
  }
];

async function seedTasks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📊 Connected to MongoDB');

    // Clear existing tasks (optional)
    const existingCount = await Task.countDocuments();
    console.log(`📋 Found ${existingCount} existing tasks`);

    if (existingCount === 0) {
      // Insert tasks
      console.log('🌱 Seeding tasks...');
      await Task.insertMany(tasksData);
      console.log(`✅ Successfully seeded ${tasksData.length} tasks`);
    } else {
      console.log('⚠️  Tasks already exist. Skipping seed.');
      console.log('   To re-seed, delete existing tasks first.');
    }

    // Display seeded tasks
    const tasks = await Task.find().sort({ category: 1, sortOrder: 1 });
    console.log('\n📋 Current tasks in database:');
    tasks.forEach(task => {
      console.log(`   ${task.taskId}: ${task.title} (${task.category})`);
    });

    console.log('\n🎉 Task seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding tasks:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📊 Disconnected from MongoDB');
  }
}

// Run the seeding
if (require.main === module) {
  seedTasks();
}

module.exports = { seedTasks, tasksData };
