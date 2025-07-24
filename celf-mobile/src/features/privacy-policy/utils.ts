/**
 * Privacy Policy Utilities
 * Helper functions for privacy policy functionality
 */

import { Alert, Linking } from 'react-native';
import { Colors } from '@/constants/design-tokens';
import { PRIVACY_URL } from './data';
import type { DataType } from './types';

/**
 * Get color for data type
 */
export const getDataTypeColor = (dataType: DataType): string => {
  switch (dataType) {
    case 'personal': return Colors.secondary.error;
    case 'usage': return Colors.secondary.warning;
    case 'device': return Colors.secondary.info;
    case 'optional': return Colors.secondary.success;
    default: return Colors.primary.blue;
  }
};

/**
 * Get label for data type
 */
export const getDataTypeLabel = (dataType: DataType): string => {
  switch (dataType) {
    case 'personal': return 'PERSONAL';
    case 'usage': return 'USAGE';
    case 'device': return 'DEVICE';
    case 'optional': return 'OPTIONAL';
    default: return 'DATA';
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
 * Open full privacy policy
 */
export const openFullPrivacyPolicy = (): void => {
  openWebsite(PRIVACY_URL, 'Privacy Policy');
};

/**
 * Open specific privacy section
 */
export const openPrivacySection = (sectionId: string, title: string): void => {
  const sectionUrl = `${PRIVACY_URL}#${sectionId}`;
  openWebsite(sectionUrl, title);
};

/**
 * Download privacy policy
 */
export const downloadPrivacyPolicy = (): void => {
  const downloadUrl = `${PRIVACY_URL}/download`;
  openWebsite(downloadUrl, 'Download Privacy Policy');
};

/**
 * Request data export
 */
export const requestDataExport = (): void => {
  Alert.alert(
    'Data Export Request',
    'We will prepare your data export and send it to your registered email address within 30 days.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Request Export', onPress: () => {
        Alert.alert('Request Submitted', 'Your data export request has been submitted.');
      }}
    ]
  );
};

/**
 * Request data deletion
 */
export const requestDataDeletion = (): void => {
  Alert.alert(
    'Delete Account Data',
    'This will permanently delete your account and all associated data. This action cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        Alert.alert('Deletion Requested', 'Your account deletion request has been submitted.');
      }}
    ]
  );
};
