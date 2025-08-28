/**
 * Balance Breakdown Card Component
 * Shows sendable vs non-sendable balance breakdown
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Typography, Button } from '@/components/ui';
import { Spacing, Colors } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useWalletStore } from '@/stores/walletStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export const BalanceBreakdownCard: React.FC = () => {
  const { balanceBreakdown, getFormattedBalance } = useWalletStore();
  const themeColors = useThemeColors();

  // Check if user has any tokens to exchange
  const hasTokensToExchange = balanceBreakdown.sendable > 0 || balanceBreakdown.nonSendable > 0;
  const totalTokens = balanceBreakdown.sendable + balanceBreakdown.nonSendable;

  const handleOpenExchange = () => {
    router.push('/(app)/exchange');
  };

  return (
    <Card
      variant="elevated"
      style={{
        marginBottom: Spacing.lg,
        backgroundColor: themeColors.card.background,
        borderRadius: 20,
        shadow: `0 6px 16px ${themeColors.isDark ? themeColors.background.primary : Colors.neutral[900]}1A`,
        elevation: 6,
      }}
    >
      <View style={{ marginBottom: Spacing.lg }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: Spacing.lg
        }}>
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: themeColors.primary.light + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.sm,
          }}>
            <Ionicons name="pie-chart" size={18} color={themeColors.icon.primary} />
          </View>
          <Typography variant="h4" weight="semibold">
            Balance Breakdown
          </Typography>
        </View>
        
        {/* Sendable Balance */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: Spacing.md,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.lg,
          backgroundColor: Colors.secondary.success + '10',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: Colors.secondary.success + '20',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.secondary.success + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Spacing.md,
            }}>
              <Ionicons
                name="send"
                size={20}
                color={Colors.secondary.success}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="bodyMedium" weight="semibold">
                Sendable Balance
              </Typography>
              <Typography variant="caption" color="secondary">
                Ready to send to other users
              </Typography>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Typography variant="bodyLarge" weight="bold" color="success">
              {getFormattedBalance(balanceBreakdown.sendable)}
            </Typography>
            <Typography variant="caption" color="secondary">
              Available
            </Typography>
          </View>
        </View>

        {/* Non-Sendable Balance */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: Spacing.md,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.lg,
          backgroundColor: Colors.secondary.warning + '10',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: Colors.secondary.warning + '20',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.secondary.warning + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Spacing.md,
            }}>
              <Ionicons
                name="lock-closed"
                size={20}
                color={Colors.secondary.warning}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="bodyMedium" weight="semibold">
                Non-Sendable Balance
              </Typography>
              <Typography variant="caption" color="secondary">
                Mining rewards & locked tokens
              </Typography>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Typography variant="bodyLarge" weight="bold" color="warning">
              {getFormattedBalance(balanceBreakdown.nonSendable)}
            </Typography>
            <Typography variant="caption" color="secondary">
              Locked
            </Typography>
          </View>
        </View>

        {/* Pending Balance */}
        {balanceBreakdown.pending > 0 && (
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: Spacing.md,
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.md,
            backgroundColor: themeColors.background.tertiary,
            borderRadius: 8,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="time"
                size={20}
                color={Colors.secondary.info}
                style={{ marginRight: Spacing.sm }}
              />
              <View>
                <Typography variant="bodyMedium" weight="semibold">
                  Pending
                </Typography>
                <Typography variant="caption" color="secondary">
                  Transactions in progress
                </Typography>
              </View>
            </View>
            <Typography variant="bodyMedium" weight="semibold" color="info">
              {getFormattedBalance(balanceBreakdown.pending)}
            </Typography>
          </View>
        )}

        {/* Enhanced Exchange Button - Always visible */}
        <TouchableOpacity
          onPress={handleOpenExchange}
          disabled={!hasTokensToExchange}
          style={{
            marginTop: Spacing.lg,
            backgroundColor: hasTokensToExchange
              ? themeColors.primary.blue
              : themeColors.background.tertiary,
            borderRadius: 16,
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadow: hasTokensToExchange
              ? `0 4px 8px ${themeColors.primary.blue}4D`
              : 'none',
            elevation: hasTokensToExchange ? 4 : 0,
            opacity: hasTokensToExchange ? 1 : 0.6,
          }}
        >
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: hasTokensToExchange
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.sm,
          }}>
            <Ionicons
              name="swap-horizontal"
              size={14}
              color={hasTokensToExchange
                ? themeColors.icon.inverse
                : themeColors.icon.secondary}
            />
          </View>
          <Typography
            variant="bodyMedium"
            color={hasTokensToExchange ? "inverse" : "secondary"}
            weight="semibold"
          >
            {hasTokensToExchange
              ? "Exchange Tokens"
              : "No Tokens to Exchange"}
          </Typography>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
