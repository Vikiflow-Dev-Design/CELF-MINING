/**
 * Maintenance Actions Component
 * Shows action buttons for retry and contact support
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface MaintenanceActionsProps {
  onRetry: () => void;
  onContactSupport: () => void;
}

export const MaintenanceActions: React.FC<MaintenanceActionsProps> = ({
  onRetry,
  onContactSupport,
}) => {
  return (
    <View style={{ gap: Spacing.sm, marginBottom: Spacing.lg }}>
      <Button
        title="Check Again"
        onPress={onRetry}
        variant="primary"
        size="large"
        icon={<Ionicons name="refresh" size={20} color={Colors.text.inverse} />}
        iconPosition="left"
      />

      <Button
        title="Contact Support"
        onPress={onContactSupport}
        variant="secondary"
        size="large"
        icon={<Ionicons name="help-circle-outline" size={20} color={Colors.primary.blue} />}
        iconPosition="left"
      />
    </View>
  );
};
