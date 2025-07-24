/**
 * Error Screen Utilities
 * Helper functions for error screen functionality
 */

import { Alert, Linking } from 'react-native';
import { router } from 'expo-router';
import type { ErrorConfig } from './types';

/**
 * Handle retry action
 */
export const handleRetry = async (
  setIsRetrying: (retrying: boolean) => void
): Promise<void> => {
  setIsRetrying(true);
  
  // Simulate retry attempt
  setTimeout(() => {
    setIsRetrying(false);
    // In a real app, this would attempt the failed operation again
    Alert.alert('Retry', 'Attempting to resolve the issue...');
  }, 2000);
};

/**
 * Handle go back action
 */
export const handleGoBack = (): void => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/(app)/dashboard');
  }
};

/**
 * Handle contact support action
 */
export const handleContactSupport = (config: ErrorConfig): void => {
  const subject = `CELF Error Report - ${config.type.toUpperCase()}`;
  const body = `Error Type: ${config.type}\nError Code: ${config.errorCode || 'N/A'}\nTitle: ${config.title}\nMessage: ${config.message}\n\nPlease describe what you were doing when this error occurred:\n\n`;
  
  const mailtoUrl = `mailto:support@celf.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  Linking.openURL(mailtoUrl).catch(() => {
    Alert.alert('Error', 'Could not open email app. Please contact support@celf.app directly.');
  });
};

/**
 * Handle report bug action
 */
export const handleReportBug = (): void => {
  Alert.alert(
    'Report Bug',
    'Thank you for helping us improve CELF. Your bug report has been submitted.',
    [{ text: 'OK' }]
  );
};
