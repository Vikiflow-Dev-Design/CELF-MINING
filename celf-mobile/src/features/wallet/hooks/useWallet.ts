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
    getFormattedBalance,
    refreshBalance,
    refreshTransactions
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
    try {
      // Refresh both balance and transactions
      await Promise.all([
        refreshBalance(),
        refreshTransactions()
      ]);
    } catch (error) {
      console.error('❌ useWallet: Error refreshing wallet data:', error);
      throw error;
    }
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
