/**
 * Transaction Details Types
 */

export interface TransactionDetail {
  id: string;
  type: 'sent' | 'received' | 'mining' | 'referral';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  fromAddress?: string;
  toAddress?: string;
  fee?: number;
  confirmations?: number;
  blockHash?: string;
}
