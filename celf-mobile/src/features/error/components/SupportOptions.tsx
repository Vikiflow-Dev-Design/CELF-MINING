/**
 * Support Options Component
 * Shows support and bug report options
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface SupportOptionsProps {
  showSupport: boolean;
  onContactSupport: () => void;
  onReportBug: () => void;
}

export const SupportOptions: React.FC<SupportOptionsProps> = ({
  showSupport,
  onContactSupport,
  onReportBug,
}) => {
  if (!showSupport) {
    return null;
  }

  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.secondary.success + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="help-circle" size={20} color={Colors.secondary.success} />
        </View>
        <Typography variant="h3" weight="semibold">
          Need Help?
        </Typography>
      </View>
      
      <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 20 }}>
        If the problem persists, our support team is here to help you resolve this issue.
      </Typography>
      
      <View style={{ gap: Spacing.md }}>
        <Button
          title="Contact Support"
          onPress={onContactSupport}
          variant="secondary"
          icon={<Ionicons name="mail" size={20} color={Colors.secondary.success} />}
          style={{
            borderColor: Colors.secondary.success,
            backgroundColor: Colors.secondary.success + '10',
          }}
        />
        
        <Button
          title="Report Bug"
          onPress={onReportBug}
          variant="secondary"
          icon={<Ionicons name="bug" size={20} color={Colors.text.secondary} />}
        />
      </View>
    </Card>
  );
};
