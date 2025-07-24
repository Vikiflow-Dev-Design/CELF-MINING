/**
 * Privacy Policy Data
 * Contains static data for privacy policy screen
 */

import type { PrivacySection, PrivacyControl } from './types';

// Website URLs
export const WEBSITE_URL = 'https://celf.app';
export const PRIVACY_URL = `${WEBSITE_URL}/privacy`;

// Version information
export const lastUpdated = '2025-01-17';
export const version = '1.0';

// Privacy sections summary
export const privacySections: PrivacySection[] = [
  {
    id: '1',
    title: 'Information We Collect',
    summary: 'Personal data, account information, and app usage data we collect to provide CELF services.',
    icon: 'folder',
    dataType: 'personal'
  },
  {
    id: '2',
    title: 'How We Use Your Data',
    summary: 'Purposes for data processing including mining rewards, transactions, and app improvements.',
    icon: 'cog',
    dataType: 'usage'
  },
  {
    id: '3',
    title: 'Data Sharing & Disclosure',
    summary: 'When and how we share your information with third parties and service providers.',
    icon: 'share',
    dataType: 'usage'
  },
  {
    id: '4',
    title: 'Data Security',
    summary: 'Security measures we implement to protect your personal information and crypto assets.',
    icon: 'shield-checkmark',
    dataType: 'personal'
  },
  {
    id: '5',
    title: 'Your Privacy Rights',
    summary: 'Your rights to access, modify, delete, or control your personal data.',
    icon: 'key',
    dataType: 'personal'
  },
  {
    id: '6',
    title: 'Cookies & Tracking',
    summary: 'How we use cookies, analytics, and tracking technologies in the app.',
    icon: 'eye',
    dataType: 'device'
  },
  {
    id: '7',
    title: 'Third-Party Services',
    summary: 'External services integrated into CELF and their privacy practices.',
    icon: 'link',
    dataType: 'optional'
  },
  {
    id: '8',
    title: 'Data Retention',
    summary: 'How long we keep your data and our deletion policies.',
    icon: 'time',
    dataType: 'usage'
  }
];

// Initial privacy controls
export const initialPrivacyControls: PrivacyControl[] = [
  {
    id: '1',
    title: 'Analytics & Performance',
    description: 'Help us improve the app by sharing usage analytics',
    isEnabled: true,
    isRequired: false,
    icon: 'analytics'
  },
  {
    id: '2',
    title: 'Marketing Communications',
    description: 'Receive updates about new features and promotions',
    isEnabled: false,
    isRequired: false,
    icon: 'mail'
  },
  {
    id: '3',
    title: 'Personalized Experience',
    description: 'Customize app experience based on your preferences',
    isEnabled: true,
    isRequired: false,
    icon: 'person'
  }
];
