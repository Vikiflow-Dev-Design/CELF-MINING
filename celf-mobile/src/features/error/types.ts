/**
 * Error Screen Types
 * Type definitions for error screen functionality
 */

export interface ErrorConfig {
  type: 'network' | 'server' | 'auth' | 'mining' | 'transaction' | 'general';
  title: string;
  message: string;
  icon: string;
  color: string;
  canRetry: boolean;
  showSupport: boolean;
  errorCode?: string;
}

export type ErrorType = 'network' | 'server' | 'auth' | 'mining' | 'transaction' | 'general';
