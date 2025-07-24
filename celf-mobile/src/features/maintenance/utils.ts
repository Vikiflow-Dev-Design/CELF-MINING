/**
 * Maintenance Screen Utilities
 * Helper functions for maintenance screen functionality
 */

import { Alert, Linking } from 'react-native';
import { router } from 'expo-router';

/**
 * Handle retry/check again action
 */
export const handleRetry = (): void => {
  Alert.alert(
    'Checking Status',
    'Checking if maintenance is complete...',
    [
      { text: 'OK' }
    ]
  );
};

/**
 * Handle contact support action
 */
export const handleContactSupport = (): void => {
  const email = 'support@celf.app';
  const subject = 'CELF Maintenance Support Request';
  const body = 'I need assistance regarding the current maintenance period.\n\n';
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  Linking.openURL(mailtoUrl).catch(() => {
    Alert.alert('Error', 'Could not open email app. Please contact support@celf.app directly.');
  });
};

/**
 * Handle go back action
 */
export const handleGoBack = (): void => {
  if (router.canGoBack()) {
    router.back();
  } else {
    // If no back navigation available, stay on maintenance screen
    Alert.alert('Maintenance Mode', 'The app is currently under maintenance. Please try again later.');
  }
};
