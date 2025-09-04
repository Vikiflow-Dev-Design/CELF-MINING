/**
 * Test Search API Endpoints
 * This script tests the user search functionality through the API
 */

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const database = require('./src/config/database');

async function testSearchAPI() {
  try {
    console.log('🔍 Testing Search API Endpoints...');
    
    // Connect to database
    await database.connect();
    console.log('✅ Database connected');

    // Create Express app for testing
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    // Mock authentication middleware for testing
    app.use('/api/users', (req, res, next) => {
      // Skip authentication for testing
      req.user = { userId: 'test-user', role: 'user' };
      next();
    }, userRoutes);

    const server = app.listen(5001, () => {
      console.log('🚀 Test server running on port 5001');
    });

    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test search endpoints
    const testQueries = [
      'alice',
      'bob',
      'charlie',
      'johnson',
      'smith',
      'victor',
      'vikiflow',
      '@example.com',
      'nonexistent'
    ];

    console.log('\n🔍 Testing search endpoints...');

    for (const query of testQueries) {
      try {
        const response = await fetch(`http://localhost:5001/api/users/search?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        
        console.log(`\n🔍 Search "${query}":`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Success: ${data.success}`);
        console.log(`   Message: ${data.message}`);
        console.log(`   Results: ${data.data ? data.data.length : 0}`);
        
        if (data.data && data.data.length > 0) {
          data.data.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - ${user.walletAddress}`);
          });
        }
      } catch (error) {
        console.error(`❌ Error testing query "${query}":`, error.message);
      }
    }

    // Test address validation
    console.log('\n🔍 Testing address validation...');
    
    const testAddresses = [
      'celf8d000295dfbd1dfce65e0ebed857e119123ae45c', // Alice's address
      'celfd2f2d0d5ebf410cd8f71a03079c9d1eae3a1169e', // Bob's address
      'celf1234567890abcdef1234567890abcdef12345678', // Invalid address
      'invalid-address' // Invalid format
    ];

    for (const address of testAddresses) {
      try {
        const response = await fetch(`http://localhost:5001/api/users/validate-address/${encodeURIComponent(address)}`);
        const data = await response.json();
        
        console.log(`\n🔍 Validate "${address.substring(0, 20)}...":`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Success: ${data.success}`);
        console.log(`   Message: ${data.message}`);
        
        if (data.data) {
          console.log(`   User: ${data.data.firstName} ${data.data.lastName} (${data.data.email})`);
        }
      } catch (error) {
        console.error(`❌ Error validating address "${address}":`, error.message);
      }
    }

    // Test user lookup by address
    console.log('\n🔍 Testing user lookup by address...');
    
    for (const address of testAddresses.slice(0, 2)) { // Test first 2 valid addresses
      try {
        const response = await fetch(`http://localhost:5001/api/users/by-address/${encodeURIComponent(address)}`);
        const data = await response.json();
        
        console.log(`\n🔍 Lookup "${address.substring(0, 20)}...":`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Success: ${data.success}`);
        console.log(`   Message: ${data.message}`);
        
        if (data.data) {
          console.log(`   User: ${data.data.firstName} ${data.data.lastName} (${data.data.email})`);
        }
      } catch (error) {
        console.error(`❌ Error looking up address "${address}":`, error.message);
      }
    }

    console.log('\n✅ Search API testing completed!');
    
    // Close server
    server.close();
    
  } catch (error) {
    console.error('❌ Error testing search API:', error.message);
    console.error('Full error:', error);
  } finally {
    await database.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Run the test
testSearchAPI().catch(console.error);
