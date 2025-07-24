/**
 * Help Center Types
 * Type definitions for help center functionality
 */

export interface FAQItem {
  id: string;
  question: string;
  category: string;
  icon: string;
}

export interface ContactOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  color: string;
}
