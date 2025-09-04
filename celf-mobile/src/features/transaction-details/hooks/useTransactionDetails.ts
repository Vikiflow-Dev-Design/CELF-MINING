/**
 * Transaction Details Hook
 */

import { useLocalSearchParams } from 'expo-router';
import { Share } from 'react-native';
import { useState, useEffect } from 'react';
import { apiService, Transaction } from '@/services/apiService';
import type { TransactionDetail } from '../types';

export const useTransactionDetails = () => {
  const { id } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransaction = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 TransactionDetails: Fetching transaction...', { id });

      const response = await apiService.getTransactionById(id as string);

      if (response.success && response.data) {
        console.log('✅ TransactionDetails: Transaction fetched:', response.data);
        setTransaction(response.data);
      } else {
        throw new Error(response.message || 'Transaction not found');
      }
    } catch (err) {
      console.error('❌ TransactionDetails: Fetch failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch transaction');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const shareTransaction = async () => {
    if (!transaction) return;

    try {
      await Share.share({
        message: `CELF Transaction: ${transaction.amount} CELF ${transaction.type} - ID: ${transaction.id}`,
        title: 'CELF Transaction',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return {
    transaction,
    shareTransaction,
    loading,
    error,
    refetch: fetchTransaction
  };
};
