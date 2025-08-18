/**
 * Test Wallet Endpoints
 * Simple test to validate wallet controller methods work correctly
 */

require('dotenv').config();
const supabaseService = require('./src/services/supabaseService');
const walletController = require('./src/controllers/walletController');

// Mock functions
const createMockFn = () => {
  const mockFn = (...args) => {
    mockFn.calls.push(args);
    return mockFn.returnValue;
  };
  mockFn.calls = [];
  mockFn.returnValue = undefined;
  mockFn.mockReturnValue = (value) => {
    mockFn.returnValue = value;
    return mockFn;
  };
  return mockFn;
};

// Mock request and response objects
const createMockReq = (userId, body = {}, params = {}, query = {}) => ({
  user: { userId },
  body,
  params,
  query
});

const createMockRes = () => {
  const res = {};
  res.status = createMockFn().mockReturnValue(res);
  res.json = createMockFn().mockReturnValue(res);
  return res;
};

const mockNext = createMockFn();

// Test functions
async function testWalletEndpoints() {
  console.log('🧪 Testing Wallet Endpoints\n');

  try {
    // Test 1: Get Balance
    console.log('1️⃣ Testing getBalance...');
    const mockUserId = 'test-user-id';
    const req1 = createMockReq(mockUserId);
    const res1 = createMockRes();

    await walletController.getBalance(req1, res1, mockNext);
    
    if (res1.json.calls.length > 0) {
      const response = res1.json.calls[0][0];
      console.log('✅ getBalance response:', JSON.stringify(response, null, 2));
    } else if (res1.status.calls.length > 0) {
      console.log('❌ getBalance failed with status:', res1.status.calls[0][0]);
    }

    // Test 2: Get Balance Breakdown
    console.log('\n2️⃣ Testing getBalanceBreakdown...');
    const req2 = createMockReq(mockUserId);
    const res2 = createMockRes();

    await walletController.getBalanceBreakdown(req2, res2, mockNext);
    
    if (res2.json.calls.length > 0) {
      const response = res2.json.calls[0][0];
      console.log('✅ getBalanceBreakdown response:', JSON.stringify(response, null, 2));
    } else if (res2.status.calls.length > 0) {
      console.log('❌ getBalanceBreakdown failed with status:', res2.status.calls[0][0]);
    }

    // Test 3: Get Addresses
    console.log('\n3️⃣ Testing getAddresses...');
    const req3 = createMockReq(mockUserId);
    const res3 = createMockRes();

    await walletController.getAddresses(req3, res3, mockNext);

    if (res3.json.calls.length > 0) {
      const response = res3.json.calls[0][0];
      console.log('✅ getAddresses response:', JSON.stringify(response, null, 2));
    } else if (res3.status.calls.length > 0) {
      console.log('❌ getAddresses failed with status:', res3.status.calls[0][0]);
    }

    // Test 4: Get Transactions
    console.log('\n4️⃣ Testing getTransactions...');
    const req4 = createMockReq(mockUserId, {}, {}, { page: 1, limit: 10 });
    const res4 = createMockRes();

    await walletController.getTransactions(req4, res4, mockNext);

    if (res4.json.calls.length > 0) {
      const response = res4.json.calls[0][0];
      console.log('✅ getTransactions response:', JSON.stringify(response, null, 2));
    } else if (res4.status.calls.length > 0) {
      console.log('❌ getTransactions failed with status:', res4.status.calls[0][0]);
    }

    // Test 5: Get Exchange Rates
    console.log('\n5️⃣ Testing getExchangeRates...');
    const req5 = createMockReq(mockUserId);
    const res5 = createMockRes();

    await walletController.getExchangeRates(req5, res5, mockNext);

    if (res5.json.calls.length > 0) {
      const response = res5.json.calls[0][0];
      console.log('✅ getExchangeRates response:', JSON.stringify(response, null, 2));
    } else if (res5.status.calls.length > 0) {
      console.log('❌ getExchangeRates failed with status:', res5.status.calls[0][0]);
    }

    console.log('\n🎉 Wallet endpoint tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run tests
testWalletEndpoints().catch(console.error);
