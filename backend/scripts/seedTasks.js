/**
 * Seed Tasks Script
 * Populates the database with initial tasks
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Task = require('../src/models/Task');

// Sample tasks data
const tasksData = [
  // Mining Tasks
  {
    taskId: "MINING_001",
    title: "First Mining Session",
    description: "Complete your first mining session to get started earning CELF tokens",
    category: "mining",
    maxProgress: 1,
    reward: 10,
    icon: "⛏️",
    tips: ["Tap the mining button to start your first session", "Mining sessions help you earn CELF tokens"],
    requirements: ["Complete 1 mining session"],
    trackingType: "automatic",
    conditions: {
      miningSessionsRequired: 1
    },
    sortOrder: 1,
    isActive: true,
    isLinkTask: false
  },
  {
    taskId: "MINING_002",
    title: "Daily Miner",
    description: "Complete 5 mining sessions to become a daily miner",
    category: "mining",
    maxProgress: 5,
    reward: 25,
    icon: "⚡",
    tips: ["Keep mining regularly to reach this milestone"],
    requirements: ["Complete 5 mining sessions"],
    trackingType: "automatic",
    conditions: {
      miningSessionsRequired: 5
    },
    sortOrder: 2,
    isActive: true,
    isLinkTask: false
  },
  {
    taskId: "MINING_003",
    title: "Mining Expert",
    description: "Complete 25 mining sessions to become a mining expert",
    category: "mining",
    maxProgress: 25,
    reward: 100,
    icon: "🏆",
    tips: ["Consistency is key to becoming a mining expert"],
    requirements: ["Complete 25 mining sessions"],
    trackingType: "automatic",
    conditions: {
      miningSessionsRequired: 25
    },
    sortOrder: 3,
    isActive: true,
    isLinkTask: false
  },

  // Social Tasks
  {
    taskId: "SOCIAL_001",
    title: "Join Discord Community",
    description: "Join our official Discord server and connect with other miners",
    category: "social",
    maxProgress: 1,
    reward: 15,
    icon: "💬",
    tips: ["Click the link to join our Discord community"],
    requirements: ["Join Discord server"],
    trackingType: "manual",
    sortOrder: 4,
    isActive: true,
    isLinkTask: true,
    linkUrl: "https://discord.gg/celf"
  },
  {
    taskId: "SOCIAL_002",
    title: "Follow on Twitter",
    description: "Follow @CELFMining on Twitter for the latest updates",
    category: "social",
    maxProgress: 1,
    reward: 10,
    icon: "🐦",
    tips: ["Stay updated with the latest CELF news"],
    requirements: ["Follow on Twitter"],
    trackingType: "manual",
    sortOrder: 5,
    isActive: true,
    isLinkTask: true,
    linkUrl: "https://twitter.com/CELFMining"
  },
  {
    taskId: "REFERRAL_001",
    title: "Share the Love",
    description: "Refer your first friend to CELF and earn bonus rewards",
    category: "referral",
    maxProgress: 1,
    reward: 20,
    icon: "👥",
    tips: ["Share your referral code with friends"],
    requirements: ["Refer 1 friend"],
    trackingType: "automatic",
    conditions: {
      referralsRequired: 1
    },
    sortOrder: 6,
    isActive: true,
    isLinkTask: false
  },
  {
    taskId: "REFERRAL_002",
    title: "Community Builder",
    description: "Refer 3 friends to CELF and build your network",
    category: "referral",
    maxProgress: 3,
    reward: 75,
    icon: "🌟",
    tips: ["Build your network by inviting more friends"],
    requirements: ["Refer 3 friends"],
    trackingType: "automatic",
    conditions: {
      referralsRequired: 3
    },
    sortOrder: 7,
    isActive: true,
    isLinkTask: false
  },

  // Wallet Tasks
  {
    taskId: "WALLET_001",
    title: "First Transaction",
    description: "Make your first token transaction to unlock wallet features",
    category: "wallet",
    maxProgress: 1,
    reward: 15,
    icon: "💳",
    tips: ["Send or receive tokens to unlock this task"],
    requirements: ["Complete 1 transaction"],
    trackingType: "automatic",
    conditions: {
      transactionsRequired: 1
    },
    sortOrder: 8,
    isActive: true,
    isLinkTask: false
  },
  {
    taskId: "WALLET_002",
    title: "Token Holder",
    description: "Hold 50 CELF tokens in your wallet to become a token holder",
    category: "wallet",
    maxProgress: 50,
    reward: 30,
    icon: "💰",
    tips: ["Accumulate tokens through mining and transactions"],
    requirements: ["Hold 50 CELF tokens"],
    trackingType: "automatic",
    conditions: {
      balanceRequired: 50
    },
    sortOrder: 9,
    isActive: true,
    isLinkTask: false
  },
  {
    taskId: "WALLET_003",
    title: "Big Spender",
    description: "Complete 10 transactions to become a big spender",
    category: "wallet",
    maxProgress: 10,
    reward: 50,
    icon: "🔄",
    tips: ["Keep using your wallet to reach this milestone"],
    requirements: ["Complete 10 transactions"],
    trackingType: "automatic",
    conditions: {
      transactionsRequired: 10
    },
    sortOrder: 10,
    isActive: true,
    isLinkTask: false
  },

];

async function seedTasks() {
  try {
    // Debug: Check if environment variables are loaded
    console.log('🔍 Checking environment variables...');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
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
