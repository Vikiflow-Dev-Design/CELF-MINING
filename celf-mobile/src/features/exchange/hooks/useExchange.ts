/**
 * Exchange Hook
 * Custom hook for exchange screen functionality
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useWalletStore } from '@/stores/walletStore';
import { ExchangeDirection, ExchangeState, ExchangeActions, ExchangeData } from '../types';
import { 
  getMaxExchangeAmount, 
  calculateQuickAmount, 
  validateExchangeAmount, 
  getSuccessMessage 
} from '../utils';
import { EXCHANGE_DIRECTION_CONFIG } from '../data';

export const useExchange = (): ExchangeState & ExchangeActions & { exchangeData: ExchangeData } => {
  const { balanceBreakdown, exchangeToSendable, exchangeToNonSendable, getFormattedBalance } = useWalletStore();
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [exchangeDirection, setExchangeDirection] = useState<ExchangeDirection>('toSendable');

  const maxExchangeAmount = getMaxExchangeAmount(
    exchangeDirection,
    balanceBreakdown.sendable,
    balanceBreakdown.nonSendable
  );

  const config = EXCHANGE_DIRECTION_CONFIG[exchangeDirection];

  const exchangeData: ExchangeData = {
    maxExchangeAmount,
    fromLabel: config.fromLabel,
    toLabel: config.toLabel,
    fromColor: config.fromColor,
    toColor: config.toColor,
  };

  const handleMaxPress = () => {
    setExchangeAmount(maxExchangeAmount.toFixed(4));
  };

  const handleQuickAmount = (percentage: number) => {
    const amount = calculateQuickAmount(percentage, maxExchangeAmount);
    setExchangeAmount(amount);
  };

  const handleDirectionSwap = () => {
    setExchangeDirection(prev => prev === 'toSendable' ? 'toNonSendable' : 'toSendable');
    setExchangeAmount(''); // Clear amount when switching direction
  };

  const handleExchange = async () => {
    const validation = validateExchangeAmount(exchangeAmount, maxExchangeAmount);

    if (!validation.isValid) {
      Alert.alert('Exchange Error', validation.message);
      return;
    }

    const amount = parseFloat(exchangeAmount);

    try {
      if (exchangeDirection === 'toSendable') {
        await exchangeToSendable(amount);
      } else {
        await exchangeToNonSendable(amount);
      }

      const successMessage = getSuccessMessage(exchangeDirection, exchangeAmount, getFormattedBalance);

      Alert.alert(
        'Exchange Successful',
        successMessage,
        [{ text: 'OK', onPress: () => { setExchangeAmount(''); router.back(); } }]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during the exchange. Please try again.';
      Alert.alert('Exchange Failed', errorMessage);
    }
  };

  return {
    exchangeAmount,
    exchangeDirection,
    exchangeData,
    setExchangeAmount,
    setExchangeDirection,
    handleMaxPress,
    handleQuickAmount,
    handleExchange,
    handleDirectionSwap,
  };
};
