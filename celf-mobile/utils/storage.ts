/**
 * Hybrid Storage Utility
 * Uses Expo SecureStore for sensitive data and AsyncStorage for bulk data
 */

import * as SecureStore from 'expo-secure-store';
// Note: AsyncStorage not needed for this implementation

// Storage interface for Zustand
export interface StorageInterface {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
  removeItem: (name: string) => Promise<void>;
}

/**
 * Secure Storage - for sensitive data
 * Uses Expo SecureStore with encryption
 */
export const secureStorage: StorageInterface = {
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore getItem error:', error);
      return null;
    }
  },
  
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('SecureStore setItem error:', error);
      throw error;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('SecureStore removeItem error:', error);
      throw error;
    }
  },
};

/**
 * For CELF: We'll use SecureStore for auth data and in-memory Zustand for everything else
 * Database integration will come later for persistent data
 */

/**
 * SecureStore-only implementation (if you want to avoid AsyncStorage completely)
 * Note: Has size limitations and performance considerations
 */
export const secureOnlyStorage: StorageInterface = {
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore getItem error:', error);
      return null;
    }
  },
  
  setItem: async (key: string, value: string) => {
    try {
      // Check size limit (SecureStore has ~2KB limit per key)
      if (value.length > 2000) {
        console.warn(`Large data (${value.length} chars) being stored in SecureStore for key: ${key}`);
        // You might want to compress or split the data here
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('SecureStore setItem error:', error);
      throw error;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('SecureStore removeItem error:', error);
      throw error;
    }
  },
};

/**
 * For CELF: Only auth data needs persistence (SecureStore)
 * Everything else will be in-memory Zustand or database later
 */

/**
 * Utility functions for storage operations
 */
export const storageUtils = {
  // Clear all app data
  clearAll: async () => {
    try {
      // Clear SecureStore (you need to know the keys)
      const secureKeys = ['celf-auth-storage'];
      await Promise.all(
        secureKeys.map(key => SecureStore.deleteItemAsync(key).catch(() => {}))
      );
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Get storage info
  getStorageInfo: async () => {
    try {
      return {
        secureStoreKeys: ['celf-auth-storage'], // Known keys
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { secureStoreKeys: [] };
    }
  },
};
