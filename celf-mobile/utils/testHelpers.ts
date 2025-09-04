/**
 * Test Helpers for Development
 * Functions to help with testing and development
 */

import { useAuthStore } from '@/stores/authStore';
import { apiService } from '@/services/apiService';

/**
 * Test login with default user credentials
 * This is for development/testing purposes only
 */
export const testLogin = async () => {
  try {
    console.log('🧪 TestHelpers: Attempting test login...');
    
    // Try to login with Victor's credentials (our test user)
    const testCredentials = {
      email: 'victor@gmail.com',
      password: 'password123' // You might need to update this
    };
    
    console.log('📡 TestHelpers: Calling auth store signIn...');
    const authStore = useAuthStore.getState();
    await authStore.signIn(testCredentials.email, testCredentials.password);
    
    console.log('✅ TestHelpers: Test login successful');
    return true;
    
  } catch (error) {
    console.error('❌ TestHelpers: Test login failed:', error);
    
    // Try alternative credentials
    try {
      console.log('🔄 TestHelpers: Trying alternative credentials...');
      const authStore = useAuthStore.getState();
      await authStore.signIn('vikiflow@gmail.com', 'password123');
      console.log('✅ TestHelpers: Alternative login successful');
      return true;
    } catch (altError) {
      console.error('❌ TestHelpers: Alternative login also failed:', altError);
      return false;
    }
  }
};

/**
 * Check current authentication status
 */
export const checkAuthStatus = async () => {
  try {
    console.log('🔍 TestHelpers: Checking auth status...');
    
    const token = await apiService.getToken();
    const authStore = useAuthStore.getState();
    
    console.log('📊 TestHelpers: Auth status:', {
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'NO TOKEN',
      isSignedIn: authStore.isSignedIn,
      user: authStore.user ? {
        email: authStore.user.email,
        name: `${authStore.user.firstName} ${authStore.user.lastName}`
      } : null
    });
    
    return {
      hasToken: !!token,
      isSignedIn: authStore.isSignedIn,
      user: authStore.user
    };
    
  } catch (error) {
    console.error('❌ TestHelpers: Auth status check failed:', error);
    return {
      hasToken: false,
      isSignedIn: false,
      user: null
    };
  }
};

/**
 * Test API connectivity
 */
export const testApiConnectivity = async () => {
  try {
    console.log('🌐 TestHelpers: Testing API connectivity...');
    
    // Test a simple endpoint
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/health`);
    const data = await response.json();
    
    console.log('✅ TestHelpers: API connectivity test:', {
      status: response.status,
      data
    });
    
    return response.ok;
    
  } catch (error) {
    console.error('❌ TestHelpers: API connectivity test failed:', error);
    return false;
  }
};

/**
 * Complete test flow for token sending
 */
export const testTokenSendingFlow = async () => {
  try {
    console.log('🧪 TestHelpers: Starting complete token sending test...');
    
    // 1. Check API connectivity
    const apiConnected = await testApiConnectivity();
    if (!apiConnected) {
      throw new Error('API not accessible');
    }
    
    // 2. Check/ensure authentication
    let authStatus = await checkAuthStatus();
    if (!authStatus.isSignedIn) {
      console.log('🔑 TestHelpers: Not authenticated, attempting login...');
      const loginSuccess = await testLogin();
      if (!loginSuccess) {
        throw new Error('Failed to authenticate');
      }
      authStatus = await checkAuthStatus();
    }
    
    // 3. Test user search
    console.log('🔍 TestHelpers: Testing user search...');
    const searchResults = await apiService.searchUsers('vikiflow', 5);
    console.log('📊 TestHelpers: Search results:', searchResults);
    
    if (!searchResults.success || !searchResults.data || searchResults.data.length === 0) {
      throw new Error('No users found in search');
    }
    
    // 4. Test wallet balance
    console.log('💰 TestHelpers: Testing wallet balance...');
    const walletResponse = await apiService.getWalletBalance();
    console.log('📊 TestHelpers: Wallet balance:', walletResponse);
    
    console.log('✅ TestHelpers: All tests passed! Ready for token sending.');
    return true;
    
  } catch (error) {
    console.error('❌ TestHelpers: Token sending test flow failed:', error);
    return false;
  }
};

/**
 * Development helper to log all relevant state
 */
export const debugAppState = () => {
  const authStore = useAuthStore.getState();
  
  console.log('🐛 DEBUG: Current app state:', {
    auth: {
      isSignedIn: authStore.isSignedIn,
      user: authStore.user,
      isLoading: authStore.isLoading,
      error: authStore.error
    },
    api: {
      baseUrl: process.env.EXPO_PUBLIC_API_URL
    }
  });
};
