/**
 * Help Center Data
 * Contains FAQ items and contact options
 */

import { Colors } from '@/constants/design-tokens';
import type { FAQItem, ContactOption } from './types';

// Website URLs
export const WEBSITE_URL = 'https://celf.app';
export const HELP_CENTER_URL = `${WEBSITE_URL}/help`;
export const CONTACT_URL = `${WEBSITE_URL}/contact`;

// Quick FAQ items
export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I start mining CELF?',
    category: 'Mining',
    icon: 'diamond'
  },
  {
    id: '2',
    question: 'How to send and receive tokens?',
    category: 'Wallet',
    icon: 'wallet'
  },
  {
    id: '3',
    question: 'What are referral bonuses?',
    category: 'Referrals',
    icon: 'people'
  },
  {
    id: '4',
    question: 'How do achievements work?',
    category: 'Gamification',
    icon: 'trophy'
  },
  {
    id: '5',
    question: 'Account security best practices',
    category: 'Security',
    icon: 'shield'
  },
  {
    id: '6',
    question: 'Troubleshooting app issues',
    category: 'Technical',
    icon: 'settings'
  }
];

// Contact options (actions will be injected by the hook)
export const getContactOptions = (actions: {
  openLiveChat: () => void;
  openEmailSupport: () => void;
  openCommunityForum: () => void;
  reportBug: () => void;
}): ContactOption[] => [
  {
    id: '1',
    title: 'Live Chat Support',
    description: 'Get instant help from our support team',
    icon: 'chatbubbles',
    color: Colors.secondary.success,
    action: actions.openLiveChat
  },
  {
    id: '2',
    title: 'Email Support',
    description: 'Send us a detailed message',
    icon: 'mail',
    color: Colors.secondary.info,
    action: actions.openEmailSupport
  },
  {
    id: '3',
    title: 'Community Forum',
    description: 'Connect with other CELF users',
    icon: 'people-circle',
    color: Colors.secondary.warning,
    action: actions.openCommunityForum
  },
  {
    id: '4',
    title: 'Report a Bug',
    description: 'Help us improve the app',
    icon: 'bug',
    color: Colors.secondary.error,
    action: actions.reportBug
  }
];
