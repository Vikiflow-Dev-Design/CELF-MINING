/**
 * Simple Search Test
 * Test the search functionality directly through the service
 */

require('dotenv').config();
const mongoose = require('mongoose');
const mongodbService = require('./src/services/mongodbService');

async function testSearch() {
  try {
    console.log('🔍 Testing Search Functionality...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log('✅ Connected to MongoDB');

    // Test search queries
    const testQueries = [
      'alice',
      'bob', 
      'victor',
      'johnson',
      'smith',
      '@example.com'
    ];

    console.log('\n🔍 Testing search queries...');

    for (const query of testQueries) {
      try {
        console.log(`\n🔍 Searching for: "${query}"`);
        const results = await mongodbService.searchUsers(query, 5);
        
        console.log(`✅ Found ${results.length} results:`);
        results.forEach((user, index) => {
          console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
          if (user.wallets && user.wallets.length > 0) {
            console.log(`     Wallet: ${user.wallets[0].currentAddress}`);
          }
        });
        
      } catch (error) {
        console.error(`❌ Error searching for "${query}":`, error.message);
      }
    }

    console.log('\n✅ Search test completed successfully!');
    
  } catch (error) {
    console.error('❌ Search test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testSearch().catch(console.error);
