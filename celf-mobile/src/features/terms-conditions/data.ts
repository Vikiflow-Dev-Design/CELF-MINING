/**
 * Terms & Conditions Data
 * Contains static data for terms and conditions screen
 */

import type { TermsSection } from './types';

// Website URLs
export const WEBSITE_URL = 'https://celf.app';
export const TERMS_URL = `${WEBSITE_URL}/terms`;

// Version information
export const lastUpdated = '2025-01-17';
export const version = '1.0';

// Terms sections summary
export const termsSections: TermsSection[] = [
  {
    id: '1',
    title: 'User Agreement',
    summary: 'Your rights and responsibilities as a CELF user, including account usage and conduct guidelines.',
    icon: 'person-circle',
    importance: 'high'
  },
  {
    id: '2',
    title: 'Mining Terms',
    summary: 'Rules and conditions for CELF token mining, including rewards, limitations, and fair usage policies.',
    icon: 'diamond',
    importance: 'high'
  },
  {
    id: '3',
    title: 'Wallet & Transactions',
    summary: 'Terms governing digital wallet usage, token transfers, and transaction processing.',
    icon: 'wallet',
    importance: 'high'
  },
  {
    id: '4',
    title: 'Privacy & Data',
    summary: 'How we collect, use, and protect your personal information and app usage data.',
    icon: 'shield-checkmark',
    importance: 'high'
  },
  {
    id: '5',
    title: 'Referral Program',
    summary: 'Terms and conditions for the referral system, bonuses, and reward distribution.',
    icon: 'people',
    importance: 'medium'
  },
  {
    id: '6',
    title: 'Intellectual Property',
    summary: 'Copyright, trademark, and intellectual property rights related to CELF platform.',
    icon: 'document-text',
    importance: 'medium'
  },
  {
    id: '7',
    title: 'Limitation of Liability',
    summary: 'Legal limitations and disclaimers regarding platform usage and potential risks.',
    icon: 'warning',
    importance: 'medium'
  },
  {
    id: '8',
    title: 'Termination',
    summary: 'Conditions under which accounts may be suspended or terminated.',
    icon: 'close-circle',
    importance: 'low'
  }
];
