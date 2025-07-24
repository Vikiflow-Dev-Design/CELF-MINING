/**
 * Transaction History Hook
 */

import { useState } from 'react';
import { router } from 'expo-router';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'mining' | 'referral';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

export const useTransactionHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sent' | 'received' | 'mining'>('all');

  const transactions: Transaction[] = [
    { id: '1', type: 'mining', amount: 25.5, status: 'completed', timestamp: '2024-12-15T10:30:00Z' },
    { id: '2', type: 'sent', amount: 100, status: 'completed', timestamp: '2024-12-14T15:20:00Z' },
    { id: '3', type: 'received', amount: 50, status: 'completed', timestamp: '2024-12-13T09:15:00Z' },
  ];

  const filteredTransactions = selectedFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === selectedFilter);

  const handleTransactionPress = (transaction: Transaction) => {
    router.push(`/transaction-details?id=${transaction.id}` as any);
  };

  const refreshTransactions = async () => {
    // In a real app, this would fetch fresh data from the server
    // For now, we'll simulate a refresh
    return new Promise<void>(resolve => setTimeout(resolve, 1500));
  };

  return {
    transactions: filteredTransactions,
    selectedFilter,
    setSelectedFilter,
    handleTransactionPress,
    refreshTransactions,
  };
};
