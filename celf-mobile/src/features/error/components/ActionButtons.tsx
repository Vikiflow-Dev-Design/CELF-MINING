/**
 * Action Buttons Component
 * Shows retry and go back buttons
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { ErrorConfig } from '../types';

interface ActionButtonsProps {
  config: ErrorConfig;
  isRetrying: boolean;
  onRetry: () => void;
  onGoBack: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  config,
  isRetrying,
  onRetry,
  onGoBack,
}) => {
  return (
    <View style={{ gap: Spacing.md, marginBottom: Spacing['2xl'] }}>
      {config.canRetry && (
        <Button
          title={isRetrying ? "Retrying..." : "Try Again"}
          onPress={onRetry}
          variant="primary"
          disabled={isRetrying}
          loading={isRetrying}
          icon={!isRetrying ? <Ionicons name="refresh" size={20} color={Colors.neutral.white} /> : undefined}
          style={{
            shadowColor: config.color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        />
      )}
      
      <Button
        title="Go Back"
        onPress={onGoBack}
        variant="secondary"
        icon={<Ionicons name="arrow-back" size={20} color={Colors.text.primary} />}
      />
    </View>
  );
};
