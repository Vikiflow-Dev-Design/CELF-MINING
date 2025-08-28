/**
 * Exchange Feature Data
 * Static data and constants for the exchange functionality
 */

import { Colors } from '@/constants/design-tokens';

export const EXCHANGE_QUICK_PERCENTAGES = [25, 50, 75, 100];

export const EXCHANGE_DIRECTION_CONFIG = {
  toSendable: {
    fromLabel: 'Non-Sendable',
    toLabel: 'Sendable',
    fromColor: Colors.secondary.warning,
    toColor: Colors.secondary.success,
    description: 'Convert mining rewards to transferable tokens',
    icon: 'arrow-forward',
  },
  toNonSendable: {
    fromLabel: 'Sendable',
    toLabel: 'Non-Sendable',
    fromColor: Colors.secondary.success,
    toColor: Colors.secondary.warning,
    description: 'Convert transferable tokens back to mining rewards',
    icon: 'arrow-back',
  },
} as const;

export const EXCHANGE_VALIDATION_MESSAGES = {
  invalidAmount: 'Please enter a valid amount',
  insufficientBalance: 'Insufficient balance for this exchange',
  zeroAmount: 'Amount must be greater than zero',
  noTokensAvailable: 'No tokens available to exchange in this direction',
  successToSendable: 'Successfully converted to sendable balance',
  successToNonSendable: 'Successfully converted to non-sendable balance',
} as const;
