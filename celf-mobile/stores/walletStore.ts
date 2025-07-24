/**
 * Wallet Store - Zustand
 * Manages wallet state, transactions, and balances
 */

import { create } from 'zustand';

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'mining' | 'referral';
  amount: number;
  fromAddress?: string;
  toAddress?: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
  fee?: number;
  hash?: string;
}

export interface WalletAddress {
  address: string;
  label?: string;
  isDefault: boolean;
}

export interface BalanceBreakdown {
  // Sendable tokens (can be sent to other users)
  sendable: number;
  // Non-sendable tokens (mining rewards, locked tokens - need to exchange first)
  nonSendable: number;
  // Pending transactions
  pending: number;
}

interface WalletState {
  // Balances - sendable vs non-sendable structure
  totalBalance: number; // sendable + nonSendable + pending
  balanceBreakdown: BalanceBreakdown;
  // Legacy fields for backward compatibility
  availableBalance: number;
  pendingBalance: number;
  
  // Addresses
  addresses: WalletAddress[];
  currentAddress: string;
  
  // Transactions
  transactions: Transaction[];
  isLoadingTransactions: boolean;
  
  // Settings
  currency: 'CELF' | 'USD';
  exchangeRate: number; // CELF to USD
  
  // Actions
  updateBalance: (balance: number) => void;
  updateBalanceBreakdown: (breakdown: Partial<BalanceBreakdown>) => void;
  addMiningReward: (amount: number) => void;
  exchangeToSendable: (amount: number) => void;
  exchangeToNonSendable: (amount: number) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  setCurrentAddress: (address: string) => void;
  addAddress: (address: WalletAddress) => void;
  sendTokens: (toAddress: string, amount: number, description?: string) => Promise<Transaction>;
  refreshTransactions: () => Promise<void>;
  updateExchangeRate: (rate: number) => void;
  setCurrency: (currency: 'CELF' | 'USD') => void;
  getFormattedBalance: (amount: number) => string;
}

export const useWalletStore = create<WalletState>((set, get) => ({
      // Initial state
      totalBalance: 24.3564,
      balanceBreakdown: {
        sendable: 5.0000, // Initial sendable balance (small amount)
        nonSendable: 19.3564, // Initial mining rewards (majority)
        pending: 0,
      },
      // Legacy fields for backward compatibility
      availableBalance: 24.3564,
      pendingBalance: 0,
      
      addresses: [
        {
          address: 'celf1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0',
          label: 'Main Wallet',
          isDefault: true,
        },
      ],
      currentAddress: 'celf1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0',
      
      transactions: [
        {
          id: '1',
          type: 'mining',
          amount: 2.5000,
          timestamp: Date.now() - 86400000, // 1 day ago
          status: 'completed',
          description: 'Mining reward',
        },
        {
          id: '2',
          type: 'receive',
          amount: 10.0000,
          fromAddress: 'celf1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0',
          timestamp: Date.now() - 172800000, // 2 days ago
          status: 'completed',
          description: 'Received from friend',
        },
      ],
      isLoadingTransactions: false,
      
      currency: 'CELF',
      exchangeRate: 0.25, // 1 CELF = $0.25 USD
      
      // Actions
      updateBalance: (balance: number) => {
        set((state) => {
          const breakdown = state.balanceBreakdown;
          return {
            totalBalance: balance,
            availableBalance: balance, // Legacy compatibility
            balanceBreakdown: {
              ...breakdown,
              transferrable: breakdown.transferrable,
              nonTransferrable: breakdown.nonTransferrable,
              pending: breakdown.pending,
            },
          };
        });
      },

      updateBalanceBreakdown: (breakdown: Partial<BalanceBreakdown>) => {
        set((state) => {
          const newBreakdown = { ...state.balanceBreakdown, ...breakdown };
          const newTotal = newBreakdown.sendable + newBreakdown.nonSendable + newBreakdown.pending;
          return {
            balanceBreakdown: newBreakdown,
            totalBalance: newTotal,
            availableBalance: newBreakdown.sendable, // Legacy compatibility
            pendingBalance: newBreakdown.pending, // Legacy compatibility
          };
        });
      },

      addMiningReward: (amount: number) => {
        set((state) => {
          const newNonSendable = state.balanceBreakdown.nonSendable + amount;
          const newBreakdown = {
            ...state.balanceBreakdown,
            nonSendable: newNonSendable,
          };
          const newTotal = newBreakdown.sendable + newBreakdown.nonSendable + newBreakdown.pending;

          return {
            balanceBreakdown: newBreakdown,
            totalBalance: newTotal,
            availableBalance: newBreakdown.sendable,
            pendingBalance: newBreakdown.pending,
          };
        });
      },

      exchangeToSendable: (amount: number) => {
        set((state) => {
          if (amount > state.balanceBreakdown.nonSendable) {
            throw new Error('Insufficient non-sendable balance');
          }

          const newBreakdown = {
            ...state.balanceBreakdown,
            sendable: state.balanceBreakdown.sendable + amount,
            nonSendable: state.balanceBreakdown.nonSendable - amount,
          };

          return {
            balanceBreakdown: newBreakdown,
            availableBalance: newBreakdown.sendable,
          };
        });
      },

      exchangeToNonSendable: (amount: number) => {
        set((state) => {
          if (amount > state.balanceBreakdown.sendable) {
            throw new Error('Insufficient sendable balance');
          }

          const newBreakdown = {
            ...state.balanceBreakdown,
            sendable: state.balanceBreakdown.sendable - amount,
            nonSendable: state.balanceBreakdown.nonSendable + amount,
          };

          return {
            balanceBreakdown: newBreakdown,
            availableBalance: newBreakdown.sendable,
          };
        });
      },

      addTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },

      updateTransaction: (id: string, updates: Partial<Transaction>) => {
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        }));
      },

      setCurrentAddress: (address: string) => {
        set({ currentAddress: address });
      },

      addAddress: (address: WalletAddress) => {
        set((state) => ({
          addresses: [...state.addresses, address],
        }));
      },

      sendTokens: async (toAddress: string, amount: number, description?: string) => {
        const state = get();

        if (amount > state.balanceBreakdown.sendable) {
          throw new Error('Insufficient sendable balance. Please exchange tokens first.');
        }

        // Create pending transaction
        const transaction: Transaction = {
          id: Date.now().toString(),
          type: 'send',
          amount: -amount, // Negative for outgoing
          toAddress,
          timestamp: Date.now(),
          status: 'pending',
          description: description || `Sent to ${toAddress.slice(0, 8)}...`,
          fee: 0.001, // Mock fee
        };

        // Add transaction and update balance
        set((state) => {
          const newBreakdown = {
            ...state.balanceBreakdown,
            sendable: state.balanceBreakdown.sendable - amount - (transaction.fee || 0),
            pending: state.balanceBreakdown.pending + amount,
          };
          const newTotal = newBreakdown.sendable + newBreakdown.nonSendable + newBreakdown.pending;

          return {
            transactions: [transaction, ...state.transactions],
            balanceBreakdown: newBreakdown,
            totalBalance: newTotal,
            availableBalance: newBreakdown.sendable,
            pendingBalance: newBreakdown.pending,
          };
        });

        // Simulate network delay
        setTimeout(() => {
          get().updateTransaction(transaction.id, {
            status: 'completed',
            hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          });

          set((state) => {
            const newBreakdown = {
              ...state.balanceBreakdown,
              pending: state.balanceBreakdown.pending - amount,
            };
            const newTotal = newBreakdown.sendable + newBreakdown.nonSendable + newBreakdown.pending;

            return {
              balanceBreakdown: newBreakdown,
              totalBalance: newTotal,
              pendingBalance: newBreakdown.pending,
            };
          });
        }, 3000);

        return transaction;
      },

      refreshTransactions: async () => {
        set({ isLoadingTransactions: true });
        
        // TODO: Replace with actual API call
        setTimeout(() => {
          set({ isLoadingTransactions: false });
        }, 1000);
      },

      updateExchangeRate: (rate: number) => {
        set({ exchangeRate: rate });
      },

      setCurrency: (currency: 'CELF' | 'USD') => {
        set({ currency });
      },

      getFormattedBalance: (amount: number) => {
        const state = get();
        if (state.currency === 'USD') {
          return `$${(amount * state.exchangeRate).toFixed(2)}`;
        }
        return `${amount.toFixed(4)} CELF`;
      },
    }));
