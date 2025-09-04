/**
 * Wallet Store - Zustand
 * Manages wallet state, transactions, and balances
 */

import { create } from 'zustand';
import { apiService, Transaction as ApiTransaction } from '@/services/apiService';

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
  exchangeToSendable: (amount: number) => Promise<void>;
  exchangeToNonSendable: (amount: number) => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  setCurrentAddress: (address: string) => void;
  addAddress: (address: WalletAddress) => void;
  sendTokens: (toAddress: string, amount: number, description?: string) => Promise<Transaction>;
  refreshTransactions: () => Promise<void>;
  updateExchangeRate: (rate: number) => void;
  setCurrency: (currency: 'CELF' | 'USD') => void;
  getFormattedBalance: (amount: number) => string;
  debugWalletState: () => void;

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
          console.log('🔄 Wallet: Refreshing balance...');
          const response = await apiService.getWalletBalance();
          console.log('📊 Wallet: API response:', response);

          if (response.success && response.data) {
            const { totalBalance, sendableBalance, nonSendableBalance, pendingBalance, currentAddress } = response.data;

            console.log('💰 Wallet: Balance data received:', {
              totalBalance,
              sendableBalance,
              nonSendableBalance,
              pendingBalance,
              currentAddress
            });

            const newBreakdown = {
              sendable: sendableBalance || 0,
              nonSendable: nonSendableBalance || 0,
              pending: pendingBalance || 0,
            };

            set({
              totalBalance: totalBalance || 0,
              balanceBreakdown: newBreakdown,
              availableBalance: sendableBalance || 0, // Legacy compatibility
              pendingBalance: pendingBalance || 0, // Legacy compatibility
              currentAddress: currentAddress || '',
              isLoadingBalance: false,
            });

            console.log('✅ Wallet Store: Balance state updated:', {
              totalBalance: totalBalance || 0,
              breakdown: newBreakdown
            });

            console.log('✅ Wallet: Balance updated successfully');

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
          } else {
            console.error('❌ Wallet: API response failed:', response.message);
            set({ isLoadingBalance: false });
          }
        } catch (error) {
          console.error('❌ Wallet: Failed to refresh balance:', error);
          set({
            isLoadingBalance: false,
            miningIntegration: {
              ...get().miningIntegration,
              syncError: error instanceof Error ? error.message : 'Failed to refresh balance'
            }
          });
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

      exchangeToSendable: async (amount: number) => {
        try {
          console.log(`🔄 Wallet: Exchanging ${amount} CELF from non-sendable to sendable...`);

          const response = await apiService.exchangeTokens(amount, 'nonSendable', 'sendable');

          if (response.success && response.data) {
            const { newBalance } = response.data;

            set((state) => ({
              balanceBreakdown: {
                sendable: newBalance.sendable,
                nonSendable: newBalance.nonSendable,
                pending: state.balanceBreakdown.pending,
              },
              totalBalance: newBalance.total,
              availableBalance: newBalance.sendable,
            }));

            console.log('✅ Wallet: Exchange to sendable completed successfully');

            // Create transaction record
            const transaction: ApiTransaction = {
              id: `exchange_${Date.now()}`,
              amount,
              type: 'exchange',
              status: 'completed',
              description: `Exchanged ${amount} CELF to sendable`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            get().addTransaction(transaction);
          } else {
            throw new Error(response.message || 'Exchange failed');
          }
        } catch (error) {
          console.error('❌ Wallet: Exchange to sendable failed:', error);
          throw error;
        }
      },

      exchangeToNonSendable: async (amount: number) => {
        try {
          console.log(`🔄 Wallet: Exchanging ${amount} CELF from sendable to non-sendable...`);

          const response = await apiService.exchangeTokens(amount, 'sendable', 'nonSendable');

          if (response.success && response.data) {
            const { newBalance } = response.data;

            set((state) => ({
              balanceBreakdown: {
                sendable: newBalance.sendable,
                nonSendable: newBalance.nonSendable,
                pending: state.balanceBreakdown.pending,
              },
              totalBalance: newBalance.total,
              availableBalance: newBalance.sendable,
            }));

            console.log('✅ Wallet: Exchange to non-sendable completed successfully');

            // Create transaction record
            const transaction: ApiTransaction = {
              id: `exchange_${Date.now()}`,
              amount,
              type: 'exchange',
              status: 'completed',
              description: `Exchanged ${amount} CELF to non-sendable`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            get().addTransaction(transaction);
          } else {
            throw new Error(response.message || 'Exchange failed');
          }
        } catch (error) {
          console.error('❌ Wallet: Exchange to non-sendable failed:', error);
          throw error;
        }
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

      sendTokens: async (toEmailOrAddress: string, amount: number, description?: string) => {
        try {
          console.log(`🚀 Wallet: Sending ${amount} CELF to ${toEmailOrAddress}...`);
          console.log(`📊 Wallet: Current state:`, {
            sendableBalance: get().balanceBreakdown.sendable,
            totalBalance: get().totalBalance,
            amount
          });

          const state = get();

          if (amount > state.balanceBreakdown.sendable) {
            console.error(`❌ Wallet: Insufficient balance. Required: ${amount}, Available: ${state.balanceBreakdown.sendable}`);
            throw new Error('Insufficient sendable balance. Please exchange tokens first.');
          }

          // Determine if it's an email or address and call appropriate API
          const isEmail = toEmailOrAddress.includes('@');
          console.log(`📡 Wallet: Sending by ${isEmail ? 'email' : 'address'}...`);

          let response;
          if (isEmail) {
            response = await apiService.sendTokensByEmail(toEmailOrAddress, amount, description);
          } else {
            response = await apiService.sendTokens(toEmailOrAddress, amount, description);
          }
          console.log(`📡 Wallet: API response:`, response);

          if (response.success && response.data) {
            const { transaction, recipient } = response.data;

            // Create local transaction record
            const localTransaction: Transaction = {
              id: transaction.id || Date.now().toString(),
              type: 'send',
              amount: -amount, // Negative for outgoing
              toAddress: isEmail ? recipient?.email || toEmailOrAddress : toEmailOrAddress,
              timestamp: Date.now(),
              status: 'completed',
              description: description || `Sent to ${recipient?.name || (isEmail ? recipient?.email : toEmailOrAddress.slice(0, 8) + '...')}`,
              fee: 0, // No fees
            };

            // Update balance and add transaction
            set((state) => {
              const newBreakdown = {
                ...state.balanceBreakdown,
                sendable: state.balanceBreakdown.sendable - amount,
              };
              const newTotal = newBreakdown.sendable + newBreakdown.nonSendable + newBreakdown.pending;

              return {
                transactions: [localTransaction, ...state.transactions],
                balanceBreakdown: newBreakdown,
                totalBalance: newTotal,
                availableBalance: newBreakdown.sendable,
              };
            });

            console.log('✅ Wallet: Tokens sent successfully');
            return localTransaction;
          } else {
            throw new Error(response.message || 'Failed to send tokens');
          }
        } catch (error) {
          console.error('❌ Wallet: Send tokens failed:', error);
          throw error;
        }
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

        // Handle NaN or invalid amounts
        if (isNaN(amount) || amount === null || amount === undefined) {
          return state.currency === 'USD' ? '$0.00' : '0.0000 CELF';
        }

        if (state.currency === 'USD') {
          const usdAmount = amount * (state.exchangeRate || 0);
          return `$${isNaN(usdAmount) ? '0.00' : usdAmount.toFixed(2)}`;
        }
        return `${amount.toFixed(4)} CELF`;
      },

      // Debug method to log current wallet state
      debugWalletState: () => {
        const state = get();
        console.log('🔍 Wallet Debug State:', {
          totalBalance: state.totalBalance,
          balanceBreakdown: state.balanceBreakdown,
          availableBalance: state.availableBalance,
          pendingBalance: state.pendingBalance,
          currentAddress: state.currentAddress,
          isLoadingBalance: state.isLoadingBalance,
          miningIntegration: state.miningIntegration,
          lastSyncTime: new Date(state.miningIntegration.lastSyncTime).toISOString(),
        });
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
        if (isNaN(earnings) || earnings < 0) {
          console.warn('⚠️ Wallet: Invalid earnings value:', earnings);
          return;
        }

        set((state) => {
          const baseBalance = state.miningIntegration.baseBalance || 0;
          const newDisplayBalance = baseBalance + earnings;

          // Only log significant changes to reduce console spam
          const currentEarnings = state.miningIntegration.currentSessionEarnings || 0;
          const earningsDiff = Math.abs(earnings - currentEarnings);
          if (earningsDiff > 0.001) { // Log only when change is > 0.001 CELF
            console.log('💰 Wallet: Mining earnings updated:', {
              previousEarnings: currentEarnings.toFixed(6),
              newEarnings: earnings.toFixed(6),
              totalBalance: newDisplayBalance.toFixed(6)
            });
          }

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
            const { totalBalance, sendableBalance, nonSendableBalance, pendingBalance } = response.data;
            const backendBalance = totalBalance || 0;

            console.log('Wallet: Backend balance received:', backendBalance);
            console.log('Wallet: Balance breakdown:', { sendableBalance, nonSendableBalance, pendingBalance });

            set((state) => ({
              balanceBreakdown: {
                sendable: sendableBalance || 0,
                nonSendable: nonSendableBalance || 0,
                pending: pendingBalance || 0,
              },
              miningIntegration: {
                ...state.miningIntegration,
                baseBalance: backendBalance,
                displayBalance: backendBalance + state.miningIntegration.currentSessionEarnings,
                lastSyncTime: Date.now(),
                syncError: null,
              },
              totalBalance: backendBalance + state.miningIntegration.currentSessionEarnings,
              availableBalance: sendableBalance || 0, // Legacy compatibility
              pendingBalance: pendingBalance || 0, // Legacy compatibility
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
