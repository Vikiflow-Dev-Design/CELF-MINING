/**
 * Send Tokens Hook
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useWalletStore } from '@/stores/walletStore';

export const useSendTokens = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { balanceBreakdown, sendTokens, getFormattedBalance } = useWalletStore();
  const balance = balanceBreakdown.sendable; // Only sendable balance can be sent

  const handleSend = async () => {
    if (!recipientAddress || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const sendAmount = parseFloat(amount);
    if (sendAmount > balance) {
      Alert.alert(
        'Insufficient Sendable Balance',
        'You need to exchange tokens first to increase your sendable balance.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exchange Tokens', onPress: () => router.push('/(app)/exchange') }
        ]
      );
      return;
    }

    setIsLoading(true);

    try {
      await sendTokens(recipientAddress, sendAmount, memo);
      setIsLoading(false);
      Alert.alert('Success', `${getFormattedBalance(sendAmount)} sent successfully!`, [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to send tokens');
    }
  };

  const scanQR = () => {
    Alert.alert('QR Scanner', 'QR code scanner would open here');
  };

  const setMaxAmount = () => {
    setAmount(balance.toString());
  };

  const openExchange = () => {
    router.push('/(app)/exchange');
  };

  return {
    recipientAddress,
    setRecipientAddress,
    amount,
    setAmount,
    memo,
    setMemo,
    balance,
    balanceBreakdown,
    getFormattedBalance,
    isLoading,
    handleSend,
    scanQR,
    setMaxAmount,
    openExchange,
  };
};
