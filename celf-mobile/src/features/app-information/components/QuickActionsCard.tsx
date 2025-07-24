/**
 * Quick Actions Card Component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shareApp } from '../utils';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface QuickActionsCardProps {
  onOpenChangelog: () => void;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onOpenChangelog,
}) => {
  const themeColors = useThemeColors();
  const quickActions: QuickAction[] = [
    {
      id: 'share',
      title: 'Share App',
      icon: 'share',
      color: Colors.secondary.info,
      onPress: shareApp,
    },
    {
      id: 'changelog',
      title: 'Changelog',
      icon: 'list',
      color: Colors.secondary.success,
      onPress: onOpenChangelog,
    },
    {
      id: 'feedback',
      title: 'Feedback',
      icon: 'chatbubble',
      color: Colors.secondary.warning,
      onPress: () => {
        // TODO: Implement feedback functionality
        console.log('Open feedback');
      },
    },
    {
      id: 'support',
      title: 'Support',
      icon: 'help-circle',
      color: Colors.primary.blue,
      onPress: () => {
        // TODO: Implement support functionality
        console.log('Open support');
      },
    },
  ];

  return (
    <Card variant="default">
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Quick Actions
      </Typography>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
      }}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={action.onPress}
            style={{
              flex: 1,
              minWidth: '45%',
              alignItems: 'center',
              paddingVertical: Spacing.lg,
              paddingHorizontal: Spacing.md,
              backgroundColor: themeColors.background.secondary,
              borderRadius: 12,
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: `${action.color}20`,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.sm,
              }}>
              <Ionicons 
                name={action.icon as any} 
                size={24} 
                color={action.color} 
              />
            </View>
            
            <Typography 
              variant="bodySmall" 
              weight="semibold" 
              style={{ textAlign: 'center' }}
            >
              {action.title}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
};
