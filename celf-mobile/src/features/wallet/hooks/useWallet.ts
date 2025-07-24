/**
 * Wallet Hook
 */

import { router } from 'expo-router';
import { useWalletStore } from '@/stores/walletStore';

export const useWallet = () => {
  const {
    totalBalance: balance,
    balanceBreakdown,
    transactions: recentTransactions,
    addresses,
    currentAddress: walletAddress,
    getFormattedBalance
  } = useWalletStore();

  const handleSendTokens = () => {
    router.push('/send-tokens');
  };

  const handleReceiveTokens = () => {
    router.push('/receive-tokens');
  };

  const handleViewHistory = () => {
    router.push('/transaction-history');
  };

  const handleTransactionPress = (transactionId: string) => {
    router.push(`/transaction-details?id=${transactionId}` as any);
  };

  const refreshWalletData = async () => {
    // In a real app, this would fetch fresh data from the server
    // For now, we'll simulate a refresh
    return new Promise<void>(resolve => setTimeout(resolve, 1500));
  };

  return {
    balance,
    balanceBreakdown,
    walletAddress,
    recentTransactions,
    getFormattedBalance,
    handleSendTokens,
    handleReceiveTokens,
    handleViewHistory,
    handleTransactionPress,
    refreshWalletData,
  };
};
