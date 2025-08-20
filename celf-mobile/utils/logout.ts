/**
 * Centralized Logout Utility
 * This ensures all logout operations use the same working pattern
 */

import { Alert } from 'react-native';
import { useAuthStore } from '@/stores/authStore';

/**
 * Performs logout with confirmation dialog
 * @param source - String identifying where logout was initiated from
 */
export const performLogout = async (source: string = 'unknown') => {
  console.log(`🚪 Logout initiated from: ${source}`);
  
  Alert.alert(
    'Sign Out',
    'Are you sure you want to sign out of your CELF account?',
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', 
        style: 'destructive',
        onPress: async () => {
          console.log(`🧪 ${source} logout - executing...`);
          try {
            // Get the signOut function directly from the store
            const { signOut } = useAuthStore.getState();
            await signOut();
            
            console.log(`✅ ${source} logout successful`);
            Alert.alert('Success', 'Signed out successfully');
          } catch (error) {
            console.error(`❌ ${source} logout error:`, error);
            Alert.alert('Error', `Failed to sign out: ${error}`);
          }
        }
      }
    ]
  );
};

/**
 * Direct logout without confirmation (for programmatic use)
 * @param source - String identifying where logout was initiated from
 */
export const performDirectLogout = async (source: string = 'unknown') => {
  console.log(`🚪 Direct logout initiated from: ${source}`);
  
  try {
    // Get the signOut function directly from the store
    const { signOut } = useAuthStore.getState();
    await signOut();
    
    console.log(`✅ ${source} direct logout successful`);
    return true;
  } catch (error) {
    console.error(`❌ ${source} direct logout error:`, error);
    throw error;
  }
};

/**
 * Hook-based logout for components that use hooks
 */
export const useLogout = () => {
  const { signOut, isLoading } = useAuthStore();
  
  const logout = async (source: string = 'hook') => {
    console.log(`🚪 Hook logout initiated from: ${source}`);
    
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your CELF account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            console.log(`🧪 ${source} hook logout - executing...`);
            try {
              await signOut();
              console.log(`✅ ${source} hook logout successful`);
              Alert.alert('Success', 'Signed out successfully');
            } catch (error) {
              console.error(`❌ ${source} hook logout error:`, error);
              Alert.alert('Error', `Failed to sign out: ${error}`);
            }
          }
        }
      ]
    );
  };
  
  const directLogout = async (source: string = 'hook') => {
    console.log(`🚪 Direct hook logout initiated from: ${source}`);
    try {
      await signOut();
      console.log(`✅ ${source} direct hook logout successful`);
      return true;
    } catch (error) {
      console.error(`❌ ${source} direct hook logout error:`, error);
      throw error;
    }
  };
  
  return {
    logout,
    directLogout,
    isLoading
  };
};
