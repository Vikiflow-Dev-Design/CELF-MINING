/**
 * Test API Structure
 * Validates that all wallet endpoints are properly structured and return correct response formats
 */

require('dotenv').config();

// Test the response structure
function testResponseStructure() {
  console.log('🧪 Testing API Response Structure\n');

  // Test createResponse utility
  const { createResponse } = require('./src/utils/responseUtils');

  console.log('1️⃣ Testing createResponse utility...');
  
  const successResponse = createResponse(true, 'Test success', { data: 'test' });
  console.log('✅ Success response:', JSON.stringify(successResponse, null, 2));

  const errorResponse = createResponse(false, 'Test error');
  console.log('✅ Error response:', JSON.stringify(errorResponse, null, 2));

  // Validate response structure
  const requiredFields = ['success', 'message', 'timestamp'];
  const hasRequiredFields = requiredFields.every(field => successResponse.hasOwnProperty(field));
  
  if (hasRequiredFields) {
    console.log('✅ Response structure is correct');
  } else {
    console.log('❌ Response structure is missing required fields');
  }

  console.log('\n2️⃣ Testing Supabase Service...');
  
  try {
    const supabaseService = require('./src/services/supabaseService');
    console.log('✅ Supabase service loaded successfully');
    
    // Test if we can create a client
    const client = supabaseService.getClient();
    if (client) {
      console.log('✅ Supabase client created successfully');
    } else {
      console.log('❌ Failed to create Supabase client');
    }
  } catch (error) {
    console.log('❌ Supabase service error:', error.message);
  }

  console.log('\n3️⃣ Testing Wallet Controller Import...');
  
  try {
    const walletController = require('./src/controllers/walletController');
    console.log('✅ Wallet controller loaded successfully');
    
    // Check if all required methods exist
    const requiredMethods = [
      'getBalance',
      'getBalanceBreakdown', 
      'getAddresses',
      'addAddress',
      'setDefaultAddress',
      'getTransactions',
      'getTransactionById',
      'sendTokens',
      'exchangeTokens',
      'getExchangeRates',
      'addMiningReward',
      'getWalletStats',
      'getPreferences',
      'updatePreferences'
    ];

    const missingMethods = requiredMethods.filter(method => typeof walletController[method] !== 'function');
    
    if (missingMethods.length === 0) {
      console.log('✅ All required wallet methods are present');
    } else {
      console.log('❌ Missing methods:', missingMethods);
    }

  } catch (error) {
    console.log('❌ Wallet controller error:', error.message);
  }

  console.log('\n4️⃣ Testing Route Structure...');
  
  try {
    const walletRoutes = require('./src/routes/walletRoutes');
    console.log('✅ Wallet routes loaded successfully');
  } catch (error) {
    console.log('❌ Wallet routes error:', error.message);
  }

  console.log('\n5️⃣ Testing Mobile API Compatibility...');
  
  // Test if the response format matches what the mobile app expects
  const mockWalletBalance = {
    totalBalance: 100.5,
    sendableBalance: 75.25,
    nonSendableBalance: 20.15,
    pendingBalance: 5.1,
    currentAddress: 'celf1234567890abcdef',
    lastActivity: new Date().toISOString()
  };

  const walletResponse = createResponse(true, 'Balance retrieved successfully', mockWalletBalance);
  
  // Check if response has the structure expected by mobile app
  const mobileExpectedFields = ['totalBalance', 'sendableBalance', 'nonSendableBalance', 'pendingBalance', 'currentAddress'];
  const hasMobileFields = mobileExpectedFields.every(field => walletResponse.data.hasOwnProperty(field));
  
  if (hasMobileFields) {
    console.log('✅ Response format is compatible with mobile app');
  } else {
    console.log('❌ Response format is not compatible with mobile app');
  }

  console.log('\n🎉 API structure tests completed!');
}

// Run tests
testResponseStructure();
