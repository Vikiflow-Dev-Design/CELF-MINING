/**
 * Hybrid Storage Utility
 * Uses Expo SecureStore for native and localStorage for web
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Storage interface for Zustand
export interface StorageInterface {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
  removeItem: (name: string) => Promise<void>;
}

/**
 * Web Storage Fallback - for web development
 * Uses localStorage when SecureStore is not available
 */
const webStorage: StorageInterface = {
  getItem: async (key: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error('localStorage getItem error:', error);
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('localStorage setItem error:', error);
      throw error;
    }
  },

  removeItem: async (key: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('localStorage removeItem error:', error);
      throw error;
    }
  },
};

/**
 * Secure Storage - for sensitive data
 * Uses Expo SecureStore on native, localStorage on web
 */
export const secureStorage: StorageInterface = {
  getItem: async (key: string) => {
    try {
      if (Platform.OS === 'web') {
        return webStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore getItem error:', error);
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      if (Platform.OS === 'web') {
        return webStorage.setItem(key, value);
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('SecureStore setItem error:', error);
      throw error;
    }
  },

  removeItem: async (key: string) => {
    try {
      if (Platform.OS === 'web') {
        return webStorage.removeItem(key);
      }
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
 * SecureStore-only implementation with web fallback
 * Uses SecureStore on native, localStorage on web
 */
export const secureOnlyStorage: StorageInterface = {
  getItem: async (key: string) => {
    try {
      if (Platform.OS === 'web') {
        return webStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore getItem error:', error);
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      if (Platform.OS === 'web') {
        return webStorage.setItem(key, value);
      }

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
      if (Platform.OS === 'web') {
        return webStorage.removeItem(key);
      }
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
