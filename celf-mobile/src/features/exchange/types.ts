/**
 * Exchange Feature Types
 * Type definitions for the exchange functionality
 */

export type ExchangeDirection = 'toSendable' | 'toNonSendable';

export interface ExchangeState {
  exchangeAmount: string;
  exchangeDirection: ExchangeDirection;
}

export interface ExchangeActions {
  setExchangeAmount: (amount: string) => void;
  setExchangeDirection: (direction: ExchangeDirection) => void;
  handleMaxPress: () => void;
  handleQuickAmount: (percentage: number) => void;
  handleExchange: () => void;
  handleDirectionSwap: () => void;
}

export interface ExchangeData {
  maxExchangeAmount: number;
  fromLabel: string;
  toLabel: string;
  fromColor: string;
  toColor: string;
}
