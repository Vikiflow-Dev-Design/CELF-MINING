/**
 * Transaction History Hook
 */

import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { apiService, Transaction } from '@/services/apiService';

export const useTransactionHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'send' | 'receive' | 'mining'>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  const fetchTransactions = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 TransactionHistory: Fetching transactions...', { page });

      const response = await apiService.getTransactions(page, pagination.limit);

      if (response.success && response.data) {
        console.log('✅ TransactionHistory: Transactions fetched:', response.data);
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch transactions');
      }
    } catch (err) {
      console.error('❌ TransactionHistory: Fetch failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = selectedFilter === 'all'
    ? transactions
    : transactions.filter(t => t.type === selectedFilter);

  const handleTransactionPress = (transaction: Transaction) => {
    router.push(`/transaction-details?id=${transaction.id}` as any);
  };

  const refreshTransactions = async () => {
    console.log('🔄 TransactionHistory: Refreshing transactions...');
    await fetchTransactions(1);
  };

  const loadMoreTransactions = async () => {
    if (pagination.page < pagination.pages && !loading) {
      console.log('📄 TransactionHistory: Loading more transactions...', { nextPage: pagination.page + 1 });
      await fetchTransactions(pagination.page + 1);
    }
  };

  return {
    transactions: filteredTransactions,
    selectedFilter,
    setSelectedFilter,
    handleTransactionPress,
    refreshTransactions,
    loadMoreTransactions,
    loading,
    error,
    pagination,
    hasMore: pagination.page < pagination.pages
  };
};
