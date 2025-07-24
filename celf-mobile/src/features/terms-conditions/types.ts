/**
 * Terms & Conditions Types
 * Type definitions for terms and conditions functionality
 */

export interface TermsSection {
  id: string;
  title: string;
  summary: string;
  icon: string;
  importance: 'high' | 'medium' | 'low';
}

export type ImportanceLevel = 'high' | 'medium' | 'low';
