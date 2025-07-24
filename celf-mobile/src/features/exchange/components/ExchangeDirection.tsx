/**
 * Exchange Direction Component
 * Shows the exchange direction with swap functionality
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ExchangeDirection as ExchangeDirectionType, ExchangeData } from '../types';

interface ExchangeDirectionProps {
  exchangeDirection: ExchangeDirectionType;
  exchangeData: ExchangeData;
  onDirectionSwap: () => void;
}

export const ExchangeDirection: React.FC<ExchangeDirectionProps> = ({
  exchangeDirection,
  exchangeData,
  onDirectionSwap,
}) => {
  const themeColors = useThemeColors();

  return (
    <Card
      variant="elevated"
      style={{
        marginBottom: Spacing['2xl'],
        backgroundColor: themeColors.card.background,
        borderRadius: 20,
        shadow: `0 8px 16px ${Colors.neutral[900]}1A`,
        elevation: 8,
      }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg
      }}>
        <View style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: Colors.primary.light + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.sm,
        }}>
          <Ionicons name="git-compare" size={18} color={Colors.primary.blue} />
        </View>
        <Typography variant="h4" weight="semibold">
          Exchange Direction
        </Typography>
      </View>

      <View style={{ alignItems: 'center' }}>
        {/* From Balance */}
        <View style={{
          width: '100%',
          padding: Spacing.lg,
          backgroundColor: exchangeData.fromColor + '15',
          borderRadius: 16,
          borderWidth: 2,
          borderColor: exchangeData.fromColor + '40',
          shadow: `0 4px 8px ${exchangeData.fromColor}1A`,
          elevation: 4,
          alignItems: 'center',
        }}>
          <Typography variant="bodyLarge" weight="bold">
            FROM: {exchangeData.fromLabel}
          </Typography>
          <Typography variant="caption" color="secondary">
            Available: {exchangeData.maxExchangeAmount.toFixed(4)} CELF
          </Typography>
        </View>

        {/* Swap Button */}
        <TouchableOpacity
          onPress={onDirectionSwap}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: Colors.primary.blue,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: Spacing.lg,
            shadow: `0 6px 12px ${Colors.primary.blue}40`,
            elevation: 6,
          }}
        >
          <Ionicons name="swap-vertical" size={24} color={Colors.neutral.white} />
        </TouchableOpacity>

        {/* To Balance */}
        <View style={{
          width: '100%',
          padding: Spacing.lg,
          backgroundColor: exchangeData.toColor + '15',
          borderRadius: 16,
          borderWidth: 2,
          borderColor: exchangeData.toColor + '40',
          shadow: `0 4px 8px ${exchangeData.toColor}1A`,
          elevation: 4,
          alignItems: 'center',
        }}>
          <Typography variant="bodyLarge" weight="bold">
            TO: {exchangeData.toLabel}
          </Typography>
          <Typography variant="caption" color="secondary">
            Will be added to this balance
          </Typography>
        </View>
      </View>
    </Card>
  );
};
