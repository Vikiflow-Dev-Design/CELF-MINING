/**
 * Splash Screen Utilities
 * Helper functions for splash screen functionality
 */

import { router } from 'expo-router';

/**
 * Navigate to the appropriate screen after splash
 */
export const navigateAfterSplash = (): void => {
  // Navigate directly to main app since authentication is removed
  router.replace('/(app)/mining');
};

/**
 * Check if app needs updates or maintenance
 */
export const checkAppStatus = (): boolean => {
  // In a real app, this would check:
  // - App version updates
  // - Maintenance status
  // - Server connectivity
  return true; // App is ready to use
};
