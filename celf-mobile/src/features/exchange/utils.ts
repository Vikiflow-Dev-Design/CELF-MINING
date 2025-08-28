/**
 * Exchange Feature Utilities
 * Helper functions for exchange calculations and validations
 */

import { ExchangeDirection } from './types';
import { EXCHANGE_VALIDATION_MESSAGES } from './data';

/**
 * Calculate the maximum exchangeable amount based on direction
 */
export const getMaxExchangeAmount = (
  direction: ExchangeDirection,
  sendableBalance: number,
  nonSendableBalance: number
): number => {
  return direction === 'toSendable' ? nonSendableBalance : sendableBalance;
};

/**
 * Calculate quick amount based on percentage
 */
export const calculateQuickAmount = (
  percentage: number,
  maxAmount: number
): string => {
  const amount = (maxAmount * percentage) / 100;
  return amount.toFixed(4);
};

/**
 * Validate exchange amount
 */
export const validateExchangeAmount = (
  amount: string,
  maxAmount: number
): { isValid: boolean; message?: string } => {
  // Check if there are any tokens available to exchange
  if (maxAmount <= 0) {
    return {
      isValid: false,
      message: 'No tokens available to exchange in this direction. Try switching the exchange direction.',
    };
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount) || numAmount <= 0) {
    return {
      isValid: false,
      message: EXCHANGE_VALIDATION_MESSAGES.invalidAmount,
    };
  }

  if (numAmount > maxAmount) {
    return {
      isValid: false,
      message: EXCHANGE_VALIDATION_MESSAGES.insufficientBalance,
    };
  }

  return { isValid: true };
};

/**
 * Format exchange success message
 */
export const getSuccessMessage = (
  direction: ExchangeDirection,
  amount: string,
  formatBalance: (amount: number) => string
): string => {
  const formattedAmount = formatBalance(parseFloat(amount));
  
  if (direction === 'toSendable') {
    return `${formattedAmount} ${EXCHANGE_VALIDATION_MESSAGES.successToSendable}`;
  } else {
    return `${formattedAmount} ${EXCHANGE_VALIDATION_MESSAGES.successToNonSendable}`;
  }
};
