import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography } from '@/components/ui';
import { Colors, Spacing, shadows } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface EmptyTransactionHistoryProps {
  onStartMining?: () => void;
}

export const EmptyTransactionHistory: React.FC<EmptyTransactionHistoryProps> = ({
  onStartMining
}) => {
  const handleStartMining = () => {
    if (onStartMining) {
      onStartMining();
    } else {
      router.push('/(app)/mining');
    }
  };

  const handleGetStarted = () => {
    router.push('/(app)/mining');
  };

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.xl
    }}>
      {/* Icon */}
      <View style={{
        width: 120,
        height: 120,
        backgroundColor: Colors.primary.blue + '10',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
        ...shadows.sm
      }}>
        <Ionicons 
          name="receipt-outline" 
          size={60} 
          color={Colors.primary.blue} 
        />
      </View>

      {/* Title */}
      <Typography 
        variant="h2" 
        color="primary" 
        weight="bold" 
        align="center"
        style={{ marginBottom: Spacing.sm }}
      >
        No Transactions Yet
      </Typography>

      {/* Description */}
      <Typography 
        variant="bodyLarge" 
        color="secondary" 
        align="center"
        style={{ 
          marginBottom: Spacing.xl,
          lineHeight: 24,
          maxWidth: 280
        }}
      >
        Start mining CELF tokens to see your transaction history here. Your mining rewards and transfers will appear once you begin.
      </Typography>

      {/* Mining Suggestion */}
      <View style={{
        backgroundColor: Colors.secondary.warning + '10',
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
      }}>
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: Colors.secondary.warning + '20',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.sm
        }}>
          <Ionicons 
            name="flash" 
            size={20} 
            color={Colors.secondary.warning} 
          />
        </View>
        
        <View style={{ flex: 1 }}>
          <Typography 
            variant="bodyMedium" 
            color="warning" 
            weight="semibold"
            style={{ marginBottom: 2 }}
          >
            Start Mining Now
          </Typography>
          <Typography 
            variant="bodySmall" 
            color="secondary"
          >
            Begin earning CELF tokens and build your transaction history
          </Typography>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ width: '100%', gap: Spacing.sm }}>
        <Button
          title="Start Mining"
          onPress={handleStartMining}
          variant="primary"
          size="large"
          icon={<Ionicons name="flash" size={20} color={Colors.text.inverse} />}
          iconPosition="left"
        />

        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="secondary"
          size="large"
          icon={<Ionicons name="arrow-forward" size={20} color={Colors.primary.blue} />}
          iconPosition="right"
        />
      </View>

      {/* Help Text */}
      <View style={{ 
        marginTop: Spacing.lg,
        alignItems: 'center'
      }}>
        <Typography 
          variant="caption" 
          color="tertiary" 
          align="center"
        >
          Need help? Visit our Help Center for mining guides
        </Typography>
      </View>
    </View>
  );
};

export default EmptyTransactionHistory;
