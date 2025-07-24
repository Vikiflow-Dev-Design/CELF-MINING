/**
 * Help Center Utilities
 * Helper functions for help center functionality
 */

import { Alert, Linking } from 'react-native';
import { WEBSITE_URL, HELP_CENTER_URL } from './data';
import type { FAQItem } from './types';

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
 * Open full help center
 */
export const openFullHelpCenter = (): void => {
  openWebsite(HELP_CENTER_URL, 'Help Center');
};

/**
 * Open FAQ item
 */
export const openFAQ = (faq: FAQItem): void => {
  const faqUrl = `${HELP_CENTER_URL}/faq/${faq.id}`;
  openWebsite(faqUrl, faq.question);
};

/**
 * Open live chat
 */
export const openLiveChat = (): void => {
  // In a real app, this would open a live chat widget
  Alert.alert(
    'Live Chat',
    'Live chat will be available soon. For immediate assistance, please use email support.',
    [
      { text: 'OK' },
      { text: 'Email Support', onPress: openEmailSupport }
    ]
  );
};

/**
 * Open email support
 */
export const openEmailSupport = (): void => {
  const email = 'support@celf.app';
  const subject = 'CELF App Support Request';
  const body = 'Please describe your issue or question:\n\n';
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  Linking.openURL(mailtoUrl).catch(() => {
    Alert.alert('Error', 'Could not open email app. Please contact support@celf.app directly.');
  });
};

/**
 * Open community forum
 */
export const openCommunityForum = (): void => {
  const forumUrl = `${WEBSITE_URL}/community`;
  openWebsite(forumUrl, 'Community Forum');
};

/**
 * Report bug
 */
export const reportBug = (): void => {
  const bugReportUrl = `${WEBSITE_URL}/bug-report`;
  openWebsite(bugReportUrl, 'Bug Report');
};

/**
 * Call emergency support
 */
export const callEmergencySupport = (): void => {
  Alert.alert(
    'Emergency Support',
    'For urgent security issues or account compromises, please contact us immediately.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call Support', onPress: () => Linking.openURL('tel:+1-800-CELF-HELP') },
      { text: 'Email Security', onPress: () => Linking.openURL('mailto:security@celf.app') }
    ]
  );
};
