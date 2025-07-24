/**
 * Quick Actions Component
 * Shows quick action buttons for navigation
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { quickActions } from '../data';

interface QuickActionsProps {
  onActionPress: (route: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onActionPress,
}) => {
  const themeColors = useThemeColors();

  // Unified color system: Use primary blue for all quick actions
  // This creates consistency and reduces visual noise
  const getColorValue = () => {
    return themeColors.icon.primary; // Always use primary blue for consistency
  };

  return (
    <Card variant="default">
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Quick Actions
      </Typography>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
        justifyContent: 'space-between',
      }}>
        {quickActions.map((action) => {
          const colorValue = getColorValue();

          return (
            <TouchableOpacity
              key={action.id}
              onPress={() => onActionPress(action.route)}
              style={{
                width: '30%', // 3 items per row with gaps
                backgroundColor: colorValue + '10',
                borderRadius: 12,
                padding: Spacing.md,
                alignItems: 'center',
                marginBottom: Spacing.sm,
              }}>
              <Ionicons name={action.icon as any} size={20} color={colorValue} />
              <Typography
                variant="caption"
                color="primary"
                weight="semibold"
                style={{
                  marginTop: Spacing.xs,
                  textAlign: 'center',
                  fontSize: 11,
                  lineHeight: 14,
                }}>
                {action.title}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
};
