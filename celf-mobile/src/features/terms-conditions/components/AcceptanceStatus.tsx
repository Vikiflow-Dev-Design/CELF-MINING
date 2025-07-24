/**
 * Acceptance Status Component
 * Shows terms acceptance status
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { lastUpdated } from '../data';

interface AcceptanceStatusProps {
  hasAccepted: boolean;
  onAccept: () => void;
}

export const AcceptanceStatus: React.FC<AcceptanceStatusProps> = ({
  hasAccepted,
  onAccept,
}) => {
  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: hasAccepted ? Colors.secondary.success + '20' : Colors.secondary.warning + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons 
            name={hasAccepted ? "checkmark-circle" : "time"} 
            size={20} 
            color={hasAccepted ? Colors.secondary.success : Colors.secondary.warning} 
          />
        </View>
        <Typography variant="h3" weight="semibold">
          Acceptance Status
        </Typography>
      </View>
      
      {hasAccepted ? (
        <View style={{
          backgroundColor: Colors.secondary.success + '10',
          padding: Spacing.md,
          borderRadius: BorderRadius.md,
        }}>
          <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
            Terms Accepted
          </Typography>
          <Typography variant="bodySmall" color="secondary">
            You accepted the current terms and conditions on {lastUpdated}
          </Typography>
        </View>
      ) : (
        <View>
          <View style={{
            backgroundColor: Colors.secondary.warning + '10',
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing.lg,
          }}>
            <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
              Acceptance Required
            </Typography>
            <Typography variant="bodySmall" color="secondary">
              Please review and accept the updated terms and conditions to continue using CELF.
            </Typography>
          </View>
          
          <Button
            title="Accept Terms & Conditions"
            onPress={onAccept}
            variant="primary"
            icon={<Ionicons name="checkmark" size={20} color={Colors.neutral.white} />}
          />
        </View>
      )}
    </Card>
  );
};
