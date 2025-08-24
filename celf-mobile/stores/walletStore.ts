/**
 * Wallet Store - Zustand
 * Manages wallet state, transactions, and balances
 */

import { create } from 'zustand';
import { apiService } from '@/services/apiService';

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

  // Mining integration for real-time balance updates
  miningIntegration: {
    baseBalance: number; // Last known balance from backend
    currentSessionEarnings: number; // Current mining session earnings
    displayBalance: number; // Base + session earnings (what user sees)
    lastSyncTime: number; // When balance was last synced with backend
    isMiningActive: boolean; // Whether mining is currently active
    syncError: string | null; // Error message if sync fails
  };

  // Addresses
  addresses: WalletAddress[];
  currentAddress: string;

  // Transactions
  transactions: Transaction[];
  isLoadingTransactions: boolean;
  isLoadingBalance: boolean;

  // Settings
  currency: 'CELF' | 'USD';
  exchangeRate: number; // CELF to USD

  // Actions
  refreshBalance: () => Promise<void>;
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

  // Mining integration actions
  initializeMiningBalance: (baseBalance: number) => void;
  updateMiningEarnings: (earnings: number) => void;
  startMiningSession: () => void;
  endMiningSession: (finalBalance: number) => void;
  syncBalanceWithBackend: () => Promise<void>;
  clearSyncError: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
      // Initial state
      totalBalance: 0,
      balanceBreakdown: {
        sendable: 0,
        nonSendable: 0,
        pending: 0,
      },
      // Legacy fields for backward compatibility
      availableBalance: 0,
      pendingBalance: 0,

      // Mining integration initial state
      miningIntegration: {
        baseBalance: 0,
        currentSessionEarnings: 0,
        displayBalance: 0,
        lastSyncTime: 0,
        isMiningActive: false,
        syncError: null,
      },

      addresses: [],
      currentAddress: '',

      transactions: [],
      isLoadingTransactions: false,
      isLoadingBalance: false,

      currency: 'CELF',
      exchangeRate: 0.25, // 1 CELF = $0.25 USD
      
      // Actions
      refreshBalance: async () => {
        set({ isLoadingBalance: true });

        try {
          const response = await apiService.getWalletBalance();

          if (response.success && response.data) {
            const { totalBalance, sendableBalance, nonSendableBalance, pendingBalance, currentAddress } = response.data;

            const newBreakdown = {
              sendable: sendableBalance,
              nonSendable: nonSendableBalance,
              pending: pendingBalance,
            };

            set({
              totalBalance,
              balanceBreakdown: newBreakdown,
              availableBalance: sendableBalance, // Legacy compatibility
              pendingBalance: pendingBalance, // Legacy compatibility
              currentAddress,
              isLoadingBalance: false,
            });

            // Update addresses if we have a current address
            if (currentAddress) {
              const state = get();
              const addressExists = state.addresses.some(addr => addr.address === currentAddress);

              if (!addressExists) {
                set({
                  addresses: [
                    ...state.addresses,
                    {
                      address: currentAddress,
                      label: 'Main Wallet',
                      isDefault: true,
                    }
                  ]
                });
              }
            }
          }
        } catch (error) {
          console.error('Failed to refresh balance:', error);
          set({ isLoadingBalance: false });
        }
      },

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

      // Mining integration actions
      initializeMiningBalance: (baseBalance: number) => {
        console.log('Wallet: Initializing mining balance with base:', baseBalance);
        set((state) => ({
          miningIntegration: {
            ...state.miningIntegration,
            baseBalance,
            displayBalance: baseBalance,
            lastSyncTime: Date.now(),
            syncError: null,
          },
          totalBalance: baseBalance, // Update main balance display
        }));
      },

      updateMiningEarnings: (earnings: number) => {
        set((state) => {
          const newDisplayBalance = state.miningIntegration.baseBalance + earnings;
          return {
            miningIntegration: {
              ...state.miningIntegration,
              currentSessionEarnings: earnings,
              displayBalance: newDisplayBalance,
            },
            totalBalance: newDisplayBalance, // Update main balance display
          };
        });
      },

      startMiningSession: () => {
        console.log('Wallet: Starting mining session');
        set((state) => ({
          miningIntegration: {
            ...state.miningIntegration,
            isMiningActive: true,
            currentSessionEarnings: 0,
            syncError: null,
          },
        }));
      },

      endMiningSession: (finalBalance: number) => {
        console.log('Wallet: Ending mining session with final balance:', finalBalance);
        set((state) => ({
          miningIntegration: {
            ...state.miningIntegration,
            isMiningActive: false,
            baseBalance: finalBalance,
            currentSessionEarnings: 0,
            displayBalance: finalBalance,
            lastSyncTime: Date.now(),
            syncError: null,
          },
          totalBalance: finalBalance, // Update main balance display
        }));
      },

      syncBalanceWithBackend: async () => {
        try {
          console.log('Wallet: Syncing balance with backend...');
          set((state) => ({
            miningIntegration: {
              ...state.miningIntegration,
              syncError: null,
            },
            isLoadingBalance: true,
          }));

          // Fetch current balance from backend
          const response = await apiService.getWalletBalance();
          if (response.success && response.data) {
            const backendBalance = response.data.totalBalance || response.data.total || 0;

            console.log('Wallet: Backend balance received:', backendBalance);

            set((state) => ({
              miningIntegration: {
                ...state.miningIntegration,
                baseBalance: backendBalance,
                displayBalance: backendBalance + state.miningIntegration.currentSessionEarnings,
                lastSyncTime: Date.now(),
                syncError: null,
              },
              totalBalance: backendBalance + state.miningIntegration.currentSessionEarnings,
              isLoadingBalance: false,
            }));
          } else {
            throw new Error(response.message || 'Failed to fetch balance');
          }
        } catch (error) {
          console.error('Wallet: Failed to sync balance:', error);
          set((state) => ({
            miningIntegration: {
              ...state.miningIntegration,
              syncError: error instanceof Error ? error.message : 'Failed to sync balance',
            },
            isLoadingBalance: false,
          }));
        }
      },

      clearSyncError: () => {
        set((state) => ({
          miningIntegration: {
            ...state.miningIntegration,
            syncError: null,
          },
        }));
      },
    }));
