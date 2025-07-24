/**
 * Privacy Policy Types
 * Type definitions for privacy policy functionality
 */

export interface PrivacySection {
  id: string;
  title: string;
  summary: string;
  icon: string;
  dataType: 'personal' | 'usage' | 'device' | 'optional';
}

export interface PrivacyControl {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
  isRequired: boolean;
  icon: string;
}

export type DataType = 'personal' | 'usage' | 'device' | 'optional';
