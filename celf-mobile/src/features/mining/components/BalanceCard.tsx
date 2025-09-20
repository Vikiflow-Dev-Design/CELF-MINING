/**
 * Balance Card Component
 * Shows the user's total CELF balance with mining integration
 */

import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Typography } from '@/components/ui';
import { Spacing } from '@/constants/design-tokens';
import { useWalletStore } from '@/stores/walletStore';
import { Ionicons } from '@expo/vector-icons';

interface BalanceCardProps {
  totalBalance?: number; // Optional - will use wallet store if not provided
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance: propBalance,
}) => {
  const {
    totalBalance: storeBalance,
    balanceBreakdown,
    miningIntegration,
    isLoadingBalance,
    syncBalanceWithBackend,
    refreshBalance,
    clearSyncError,
    getFormattedBalance
  } = useWalletStore();

  // Ensure balance is loaded when component mounts (only once)
  useEffect(() => {
    // Only refresh if balance is 0 AND we haven't recently synced AND not currently loading
    const lastSyncTime = miningIntegration.lastSyncTime;
    const timeSinceLastSync = Date.now() - lastSyncTime;
    const shouldRefresh = storeBalance === 0 &&
                         !isLoadingBalance &&
                         timeSinceLastSync > 10000 && // Increased to 10 seconds to reduce redundant calls
                         miningIntegration.baseBalance === 0; // Only if mining hasn't set a base balance

    if (shouldRefresh) {
      console.log('💰 BalanceCard: Balance is 0 and no recent sync, refreshing...');
      refreshBalance().catch(error => {
        console.error('❌ BalanceCard: Failed to refresh balance:', error);
      });
    } else if (storeBalance === 0) {
      console.log('💰 BalanceCard: Balance is 0 but recently synced or loading, skipping refresh');
    }
  }, []); // Empty dependency array - only run once on mount

  // Use prop balance or store balance
  const displayBalance = propBalance !== undefined ? propBalance : storeBalance;

  const handleRefreshBalance = async () => {
    try {
      clearSyncError();
      await syncBalanceWithBackend();
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  };

  const renderMiningIndicator = () => {
    const earnings = miningIntegration.currentSessionEarnings || 0;

    if (!miningIntegration.isMiningActive || earnings === 0) {
      return null;
    }

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.sm,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        backgroundColor: '#E8F5E8',
        borderRadius: 16,
        alignSelf: 'center',
      }}>
        <View style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#4CAF50',
          marginRight: Spacing.xs,
        }} />
        <Typography variant="bodySmall" color="success" weight="medium">
          +{earnings.toFixed(6)} CELF mining
        </Typography>
      </View>
    );
  };

  const renderSyncError = () => {
    if (!miningIntegration.syncError) return null;

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Spacing.md,
        padding: Spacing.md,
        backgroundColor: '#FFF5F5',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#FF6B6B',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Ionicons name="warning-outline" size={16} color="#FF6B6B" />
          <Typography
            variant="bodySmall"
            color="error"
            style={{ marginLeft: Spacing.xs, flex: 1 }}
          >
            {miningIntegration.syncError}
          </Typography>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.xs,
            backgroundColor: '#E3F2FD',
            borderRadius: 16,
          }}
          onPress={handleRefreshBalance}
          disabled={isLoadingBalance}
        >
          <Ionicons
            name="refresh-outline"
            size={14}
            color="#007AFF"
            style={{ marginRight: Spacing.xs }}
          />
          <Typography variant="bodySmall" color="primary" weight="medium">
            Retry
          </Typography>
        </TouchableOpacity>
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
      <Typography
        variant="bodySmall"
        color="secondary"
        style={{ marginTop: Spacing.xs }}
      >
        Last synced: {syncText}
      </Typography>
    );
  };

  return (
    <Card variant="elevated" style={{ marginBottom: Spacing['3xl'] }}>
      <View style={{ alignItems: 'center', position: 'relative' }}>
        {/* Refresh Button */}
        {!miningIntegration.syncError && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              padding: Spacing.sm,
            }}
            onPress={handleRefreshBalance}
            disabled={isLoadingBalance}
          >
            <Ionicons
              name="refresh-outline"
              size={18}
              color="#007AFF"
            />
          </TouchableOpacity>
        )}

        <Typography
          variant="bodyMedium"
          color="secondary"
          style={{ marginBottom: Spacing.xs }}>
          Total Balance
        </Typography>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Typography
            variant="displayMedium"
            weight="bold"
            style={{ marginBottom: Spacing.xs }}>
            {getFormattedBalance(displayBalance)}
          </Typography>
        </View>

        <Typography variant="bodyLarge" color="primary" weight="semibold">
          CELF
        </Typography>

        {/* Balance Breakdown */}
        <View style={{
          marginTop: Spacing.lg,
          width: '100%',
          paddingHorizontal: Spacing.md,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Spacing.sm,
          }}>
            <Typography variant="bodySmall" color="secondary">
              Sendable
            </Typography>
            <Typography variant="bodySmall" weight="medium">
              {getFormattedBalance(balanceBreakdown.sendable)}
            </Typography>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Spacing.sm,
          }}>
            <Typography variant="bodySmall" color="secondary">
              Non-Sendable
            </Typography>
            <Typography variant="bodySmall" weight="medium">
              {getFormattedBalance(balanceBreakdown.nonSendable)}
            </Typography>
          </View>

          {balanceBreakdown.pending > 0 && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: Spacing.sm,
            }}>
              <Typography variant="bodySmall" color="secondary">
                Pending
              </Typography>
              <Typography variant="bodySmall" weight="medium" color="warning">
                {getFormattedBalance(balanceBreakdown.pending)}
              </Typography>
            </View>
          )}

          {/* Divider */}
          <View style={{
            height: 1,
            backgroundColor: '#E5E5E5',
            marginVertical: Spacing.sm,
          }} />

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant="bodyMedium" weight="semibold">
              Total Balance
            </Typography>
            <Typography variant="bodyMedium" weight="bold">
              {getFormattedBalance(displayBalance)}
            </Typography>
          </View>
        </View>

        {/* Mining Indicator */}
        {renderMiningIndicator()}

        {/* Last Sync Time */}
        {renderLastSyncTime()}

        {/* Error Display */}
        {renderSyncError()}
      </View>
    </Card>
  );
};
