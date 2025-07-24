/**
 * Terms & Conditions Utilities
 * Helper functions for terms and conditions functionality
 */

import { Alert, Linking } from 'react-native';
import { Colors } from '@/constants/design-tokens';
import { TERMS_URL, lastUpdated } from './data';
import type { ImportanceLevel } from './types';

/**
 * Get color for importance level
 */
export const getImportanceColor = (importance: ImportanceLevel): string => {
  switch (importance) {
    case 'high': return Colors.secondary.error;
    case 'medium': return Colors.secondary.warning;
    case 'low': return Colors.secondary.info;
    default: return Colors.primary.blue;
  }
};

/**
 * Get label for importance level
 */
export const getImportanceLabel = (importance: ImportanceLevel): string => {
  switch (importance) {
    case 'high': return 'IMPORTANT';
    case 'medium': return 'REVIEW';
    case 'low': return 'INFO';
    default: return 'REVIEW';
  }
};

/**
 * Open website URL with error handling
 */
export const openWebsite = async (url: string, title: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Cannot open ${title}. Please check your internet connection.`);
    }
  } catch (error) {
    Alert.alert('Error', `Failed to open ${title}. Please try again later.`);
  }
};

/**
 * Open full terms and conditions
 */
export const openFullTerms = (): void => {
  openWebsite(TERMS_URL, 'Terms & Conditions');
};

/**
 * Open specific terms section
 */
export const openTermsSection = (sectionId: string, title: string): void => {
  const sectionUrl = `${TERMS_URL}#${sectionId}`;
  openWebsite(sectionUrl, title);
};

/**
 * Download terms and conditions
 */
export const downloadTerms = (): void => {
  const downloadUrl = `${TERMS_URL}/download`;
  openWebsite(downloadUrl, 'Download Terms');
};

/**
 * Accept terms and conditions
 */
export const acceptTerms = (
  hasAccepted: boolean,
  onAccept: () => void
): void => {
  if (hasAccepted) {
    Alert.alert('Already Accepted', 'You have already accepted the current terms and conditions.');
    return;
  }

  Alert.alert(
    'Accept Terms & Conditions',
    'By accepting, you agree to be bound by all terms and conditions. Please make sure you have read and understood them.',
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Accept', 
        onPress: () => {
          onAccept();
          Alert.alert('Terms Accepted', 'Thank you for accepting our terms and conditions.');
        }
      }
    ]
  );
};
