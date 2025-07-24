/**
 * Quick Acceptance Component
 * Shows quick acceptance option when terms are not accepted
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface QuickAcceptanceProps {
  hasAccepted: boolean;
  onAccept: () => void;
}

export const QuickAcceptance: React.FC<QuickAcceptanceProps> = ({
  hasAccepted,
  onAccept,
}) => {
  if (hasAccepted) {
    return null;
  }

  return (
    <Card 
      variant="default" 
      style={{ 
        backgroundColor: Colors.secondary.warning + '10',
        borderWidth: 1,
        borderColor: Colors.secondary.warning + '30',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.secondary.warning + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="warning" size={20} color={Colors.secondary.warning} />
        </View>
        <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.warning }}>
          Quick Acceptance
        </Typography>
      </View>
      
      <Typography variant="bodyMedium" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
        By using CELF, you agree to our terms and conditions. Please review them carefully before accepting.
      </Typography>
      
      <Button
        title="I Accept the Terms & Conditions"
        onPress={onAccept}
        variant="secondary"
        icon={<Ionicons name="checkmark" size={20} color={Colors.secondary.warning} />}
        style={{
          borderColor: Colors.secondary.warning,
          backgroundColor: Colors.secondary.warning + '10',
        }}
      />
    </Card>
  );
};
