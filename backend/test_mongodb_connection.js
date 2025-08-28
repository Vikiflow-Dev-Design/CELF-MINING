#!/usr/bin/env node

/**
 * Test MongoDB connection and basic functionality
 */

const database = require('./src/config/database');
const mongodbService = require('./src/services/mongodbService');

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...\n');
  
  try {
    // Test database connection
    console.log('1️⃣ Connecting to MongoDB...');
    await database.connect();
    console.log('✅ MongoDB connection successful');
    
    // Test health check
    console.log('\n2️⃣ Testing health check...');
    const health = await database.healthCheck();
    console.log('✅ Health check:', health.status);
    
    // Test service initialization
    console.log('\n3️⃣ Testing MongoDB service...');
    mongodbService.init();
    console.log('✅ MongoDB service initialized');
    
    // Test admin settings initialization
    console.log('\n4️⃣ Initializing default admin settings...');
    const initialized = await mongodbService.initializeDefaultSettings();
    if (initialized) {
      console.log('✅ Default admin settings initialized');
    } else {
      console.log('⚠️  Admin settings initialization failed (may already exist)');
    }
    
    // Test basic operations
    console.log('\n5️⃣ Testing basic operations...');
    
    // Test count operation (should work even with empty collections)
    const userCount = await mongodbService.count('User');
    console.log(`✅ User count: ${userCount}`);
    
    // Test mining settings
    console.log('\n6️⃣ Testing mining settings...');
    const miningSettings = await mongodbService.getMiningSettings();
    console.log('✅ Mining settings retrieved:', Object.keys(miningSettings).length, 'settings');
    
    // Test system settings
    console.log('\n7️⃣ Testing system settings...');
    const systemSettings = await mongodbService.getSystemSettings();
    console.log('✅ System settings retrieved:', Object.keys(systemSettings).length, 'settings');
    
    console.log('\n🎉 All tests passed! MongoDB backend is ready.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    // Clean up
    try {
      await database.disconnect();
      console.log('\n🔄 Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting:', error.message);
    }
  }
}

async function testBasicCRUD() {
  console.log('\n🧪 Testing basic CRUD operations...\n');
  
  try {
    // Create a test user
    console.log('Creating test user...');
    const testUser = await mongodbService.createUser({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'testpassword123',
      role: 'user'
    });
    console.log('✅ Test user created:', testUser.id);
    
    // Find the user
    console.log('Finding test user...');
    const foundUser = await mongodbService.findUserByEmail('test@example.com');
    console.log('✅ Test user found:', foundUser.email);
    
    // Update the user
    console.log('Updating test user...');
    const updatedUser = await mongodbService.updateUser(testUser.id, {
      firstName: 'Updated'
    });
    console.log('✅ Test user updated:', updatedUser.firstName);
    
    // Delete the user
    console.log('Deleting test user...');
    const deleted = await mongodbService.delete('User', testUser.id);
    console.log('✅ Test user deleted:', deleted);
    
    console.log('\n🎉 CRUD operations test passed!');
    
  } catch (error) {
    console.error('\n❌ CRUD test failed:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 MongoDB Backend Test Suite\n');
  console.log('============================\n');
  
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/celf-mining-test';
  
  try {
    await testConnection();
    await testBasicCRUD();
    
    console.log('\n✅ All tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Test API endpoints');
    console.log('3. Verify mobile app integration');
    console.log('4. Test admin dashboard');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
