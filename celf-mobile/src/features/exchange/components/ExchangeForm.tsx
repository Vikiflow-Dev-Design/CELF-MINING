/**
 * Exchange Form Component
 * Form for entering exchange amount with quick actions
 */

import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ExchangeData } from '../types';
import { EXCHANGE_QUICK_PERCENTAGES } from '../data';

interface ExchangeFormProps {
  exchangeAmount: string;
  exchangeData: ExchangeData;
  onAmountChange: (amount: string) => void;
  onMaxPress: () => void;
  onQuickAmount: (percentage: number) => void;
  onExchange: () => void;
}

export const ExchangeForm: React.FC<ExchangeFormProps> = ({
  exchangeAmount,
  exchangeData,
  onAmountChange,
  onMaxPress,
  onQuickAmount,
  onExchange,
}) => {
  const themeColors = useThemeColors();
  
  const isValidAmount = exchangeAmount && 
    parseFloat(exchangeAmount) > 0 && 
    parseFloat(exchangeAmount) <= exchangeData.maxExchangeAmount;

  return (
    <Card
      variant="elevated"
      style={{
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
          <Ionicons name="calculator" size={18} color={Colors.primary.blue} />
        </View>
        <Typography variant="h4" weight="semibold">
          Exchange Amount
        </Typography>
      </View>

      {/* Available Balance Display */}
      <View style={{
        padding: Spacing.md,
        backgroundColor: Colors.primary.light + '10',
        borderRadius: 12,
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.primary.light + '30',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
          <Ionicons name="wallet" size={16} color={Colors.primary.blue} style={{ marginRight: Spacing.xs }} />
          <Typography variant="caption" color="primary" weight="semibold">
            Available to Exchange
          </Typography>
        </View>
        <Typography variant="h3" weight="bold" color="primary">
          {exchangeData.maxExchangeAmount.toFixed(4)} CELF
        </Typography>
      </View>

      {/* Amount Input */}
      <View style={{ marginBottom: Spacing.lg }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: Spacing.sm,
        }}>
          <Typography variant="bodyMedium" weight="semibold">
            Amount to Exchange
          </Typography>
          <Button
            title="MAX"
            onPress={onMaxPress}
            variant="outline"
            size="small"
            style={{ paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs }}
          />
        </View>
        
        <View style={{
          borderWidth: 2,
          borderColor: themeColors.border.primary,
          borderRadius: 16,
          backgroundColor: themeColors.background.primary,
          shadow: `0 2px 8px ${Colors.neutral[900]}0D`,
          elevation: 2,
        }}>
          <TextInput
            style={{
              padding: Spacing.lg,
              fontSize: 18,
              fontWeight: '600',
              color: themeColors.text.primary,
            }}
            value={exchangeAmount}
            onChangeText={onAmountChange}
            placeholder="0.0000"
            keyboardType="numeric"
            placeholderTextColor={themeColors.text.tertiary}
          />
        </View>
      </View>

      {/* Quick Amount Buttons */}
      <View style={{ marginBottom: Spacing.lg }}>
        <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.sm }}>
          Quick Select
        </Typography>
        <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
          {EXCHANGE_QUICK_PERCENTAGES.map((percentage) => (
            <Button
              key={percentage}
              title={`${percentage}%`}
              onPress={() => onQuickAmount(percentage)}
              variant="outline"
              size="small"
              style={{ flex: 1 }}
            />
          ))}
        </View>
      </View>

      {/* Exchange Button */}
      <TouchableOpacity
        onPress={onExchange}
        disabled={!isValidAmount}
        style={{
          backgroundColor: isValidAmount ? Colors.primary.blue : Colors.neutral.light,
          borderRadius: 16,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadow: isValidAmount ? `0 8px 16px ${Colors.primary.blue}66` : 'none',
          elevation: isValidAmount ? 8 : 0,
        }}
      >
        <View style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.sm,
        }}>
          <Ionicons name="swap-horizontal" size={16} color={Colors.neutral.white} />
        </View>
        <Typography
          variant="bodyLarge"
          color="inverse"
          weight="bold"
        >
          Exchange Tokens
        </Typography>
      </TouchableOpacity>
    </Card>
  );
};
