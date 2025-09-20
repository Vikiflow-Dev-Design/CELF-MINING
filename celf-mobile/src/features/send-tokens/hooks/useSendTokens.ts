/**
 * Send Tokens Hook
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useWalletStore } from '@/stores/walletStore';
import { useAuthStore } from '@/stores/authStore';
import { apiService, UserSearchResult } from '@/services/apiService';

export const useSendTokens = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<UserSearchResult | null>(null);
  const [isValidatingRecipient, setIsValidatingRecipient] = useState(false);
  const [recipientValidationError, setRecipientValidationError] = useState<string | null>(null);

  const { balanceBreakdown, sendTokens, getFormattedBalance } = useWalletStore();
  const { user } = useAuthStore(); // Get current user to prevent self-selection
  const balance = balanceBreakdown.sendable; // Only sendable balance can be sent

  const handleUserSelect = (selectedUser: UserSearchResult) => {
    // Prevent self-selection
    if (user && selectedUser.id === user.id) {
      Alert.alert(
        'Cannot Send to Yourself',
        'You cannot send tokens to your own account. Please select a different recipient.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    setSelectedRecipient(selectedUser);
    setRecipientAddress(selectedUser.walletAddress || '');
    setRecipientValidationError(null);
  };

  const handleAddressEnter = async (address: string) => {
    setIsValidatingRecipient(true);
    setRecipientValidationError(null);
    setSelectedRecipient(null);

    try {
      const response = await apiService.validateAddress(address);
      if (response.success && response.data) {
        const userResult: UserSearchResult = {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          walletAddress: response.data.walletAddress,
        };
        setSelectedRecipient(userResult);
        setRecipientAddress(address);
      } else {
        setRecipientValidationError(response.message || 'Invalid wallet address');
      }
    } catch (error) {
      setRecipientValidationError('Failed to validate address');
    } finally {
      setIsValidatingRecipient(false);
    }
  };

  const clearRecipient = () => {
    setSelectedRecipient(null);
    setRecipientAddress('');
    setRecipientValidationError(null);
  };

  const handleSend = async () => {
    if (!recipientAddress || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!selectedRecipient) {
      Alert.alert('Error', 'Please select a valid recipient');
      return;
    }

    // Prevent self-transfer (additional safety check)
    if (user && selectedRecipient.id === user.id) {
      Alert.alert(
        'Cannot Send to Yourself',
        'You cannot send tokens to your own account. Please select a different recipient.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    const sendAmount = parseFloat(amount);
    if (sendAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

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
      const response = await apiService.sendTokens(recipientAddress, sendAmount, memo);

      if (response.success) {
        // Update local wallet state
        await sendTokens(recipientAddress, sendAmount, memo);

        setIsLoading(false);

        const recipientName = selectedRecipient
          ? `${selectedRecipient.firstName} ${selectedRecipient.lastName}`
          : recipientAddress.slice(0, 8) + '...';

        Alert.alert(
          'Success',
          `${getFormattedBalance(sendAmount)} sent successfully to ${recipientName}!`,
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        throw new Error(response.message || 'Transaction failed');
      }
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
    selectedRecipient,
    isValidatingRecipient,
    recipientValidationError,
    handleSend,
    handleUserSelect,
    handleAddressEnter,
    clearRecipient,
    scanQR,
    setMaxAmount,
    openExchange,
  };
};
