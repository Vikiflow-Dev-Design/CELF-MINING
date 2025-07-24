/**
 * Error Screen Data
 * Contains error configurations and quick solutions
 */

import { Colors } from '@/constants/design-tokens';
import type { ErrorConfig, ErrorType } from './types';

/**
 * Get error configuration based on type
 */
export const getErrorConfig = (
  type: string,
  title: string,
  message: string,
  errorCode: string,
  canRetry: string,
  showSupport: string
): ErrorConfig => {
  switch (type) {
    case 'network':
      return {
        type: 'network',
        title: title || 'Connection Error',
        message: message || 'Unable to connect to CELF servers. Please check your internet connection and try again.',
        icon: 'wifi-off',
        color: Colors.secondary.warning,
        canRetry: true,
        showSupport: false,
        errorCode: errorCode
      };
    case 'server':
      return {
        type: 'server',
        title: title || 'Server Error',
        message: message || 'CELF servers are temporarily unavailable. Our team has been notified and is working on a fix.',
        icon: 'server',
        color: Colors.secondary.error,
        canRetry: true,
        showSupport: true,
        errorCode: errorCode
      };
    case 'auth':
      return {
        type: 'auth',
        title: title || 'Authentication Error',
        message: message || 'Your session has expired. Please log in again to continue using CELF.',
        icon: 'key',
        color: Colors.secondary.error,
        canRetry: false,
        showSupport: true,
        errorCode: errorCode
      };
    case 'mining':
      return {
        type: 'mining',
        title: title || 'Mining Error',
        message: message || 'Unable to start mining session. This could be due to device limitations or network issues.',
        icon: 'diamond',
        color: Colors.secondary.warning,
        canRetry: true,
        showSupport: true,
        errorCode: errorCode
      };
    case 'transaction':
      return {
        type: 'transaction',
        title: title || 'Transaction Error',
        message: message || 'Transaction failed to process. Your funds are safe and no charges were applied.',
        icon: 'card',
        color: Colors.secondary.error,
        canRetry: true,
        showSupport: true,
        errorCode: errorCode
      };
    default:
      return {
        type: 'general',
        title: title || 'Something Went Wrong',
        message: message || 'An unexpected error occurred. Please try again or contact support if the problem persists.',
        icon: 'alert-circle',
        color: Colors.secondary.error,
        canRetry: canRetry === 'true',
        showSupport: showSupport === 'true',
        errorCode: errorCode
      };
  }
};

/**
 * Get quick solutions based on error type
 */
export const getQuickSolutions = (type: ErrorType): string[] => {
  switch (type) {
    case 'network':
      return [
        'Check your internet connection',
        'Try switching between WiFi and mobile data',
        'Restart the app',
        'Check if CELF servers are online'
      ];
    case 'mining':
      return [
        'Close other apps to free up memory',
        'Ensure your device has sufficient battery',
        'Check your internet connection',
        'Restart the mining session'
      ];
    case 'transaction':
      return [
        'Verify your wallet balance',
        'Check the recipient address',
        'Ensure network fees are sufficient',
        'Try the transaction again later'
      ];
    case 'auth':
      return [
        'Log out and log back in',
        'Clear app cache',
        'Check your credentials',
        'Reset your password if needed'
      ];
    default:
      return [
        'Restart the app',
        'Check your internet connection',
        'Update to the latest version',
        'Contact support if issue persists'
      ];
  }
};
