/**
 * Transaction Details Hook
 */

import { useLocalSearchParams } from 'expo-router';
import { Share } from 'react-native';
import type { TransactionDetail } from '../types';

export const useTransactionDetails = () => {
  const { id } = useLocalSearchParams();
  
  // Mock transaction data - in real app, fetch by ID
  const transaction: TransactionDetail = {
    id: id as string || '1',
    type: 'sent',
    amount: 125.5,
    status: 'completed',
    timestamp: '2024-12-15T10:30:00Z',
    fromAddress: '0x1234...5678',
    toAddress: '0x8765...4321',
    fee: 0.001,
    confirmations: 12,
    blockHash: '0xabcd...efgh',
  };

  const shareTransaction = async () => {
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
  };
};
