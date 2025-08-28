/**
 * Wallet Balance Display Component
 * Shows real-time balance with mining integration and error handling
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useWalletStore } from '@/stores/walletStore';
import { Ionicons } from '@expo/vector-icons';

interface WalletBalanceDisplayProps {
  showMiningIndicator?: boolean;
  style?: any;
}

export const WalletBalanceDisplay: React.FC<WalletBalanceDisplayProps> = ({
  showMiningIndicator = true,
  style
}) => {
  const {
    totalBalance,
    miningIntegration,
    isLoadingBalance,
    syncBalanceWithBackend,
    clearSyncError,
    getFormattedBalance
  } = useWalletStore();

  const handleRefreshBalance = async () => {
    try {
      clearSyncError();
      await syncBalanceWithBackend();
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  };

  const renderSyncError = () => {
    if (!miningIntegration.syncError) return null;

    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Ionicons name="warning-outline" size={16} color="#FF6B6B" />
          <Text style={styles.errorText}>
            {miningIntegration.syncError}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={handleRefreshBalance}
          disabled={isLoadingBalance}
        >
          <Ionicons 
            name="refresh-outline" 
            size={16} 
            color="#007AFF" 
            style={isLoadingBalance ? styles.spinning : undefined}
          />
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMiningIndicator = () => {
    if (!showMiningIndicator || !miningIntegration.isMiningActive) return null;

    const earnings = miningIntegration.currentSessionEarnings || 0;
    const formattedEarnings = isNaN(earnings) ? '0.000000' : earnings.toFixed(6);

    return (
      <View style={styles.miningIndicator}>
        <View style={styles.miningDot} />
        <Text style={styles.miningText}>
          +{formattedEarnings} CELF mining
        </Text>
      </View>
    );
  };

  const renderLastSyncTime = () => {
    if (!miningIntegration.lastSyncTime) return null;

    const timeSinceSync = Date.now() - miningIntegration.lastSyncTime;
    const minutesAgo = Math.floor(timeSinceSync / (1000 * 60));
    
    let syncText = 'Just now';
    if (minutesAgo > 0) {
      syncText = `${minutesAgo}m ago`;
    }

    return (
      <Text style={styles.syncTime}>
        Last synced: {syncText}
      </Text>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Main Balance Display */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            {getFormattedBalance(totalBalance)}
          </Text>
          {isLoadingBalance && (
            <Ionicons 
              name="refresh-outline" 
              size={20} 
              color="#666" 
              style={styles.spinning}
            />
          )}
        </View>
        
        {/* Mining Indicator */}
        {renderMiningIndicator()}
        
        {/* Last Sync Time */}
        {renderLastSyncTime()}
      </View>

      {/* Error Display */}
      {renderSyncError()}

      {/* Manual Refresh Button */}
      {!miningIntegration.syncError && (
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefreshBalance}
          disabled={isLoadingBalance}
        >
          <Ionicons 
            name="refresh-outline" 
            size={18} 
            color="#007AFF"
            style={isLoadingBalance ? styles.spinning : undefined}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  miningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    gap: 6,
  },
  miningDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  miningText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  syncTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    flex: 1,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    gap: 4,
  },
  retryText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  refreshButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
  spinning: {
    transform: [{ rotate: '360deg' }],
  },
});

export default WalletBalanceDisplay;
