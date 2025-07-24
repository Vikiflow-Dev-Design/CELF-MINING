/**
 * Achievement Card Component
 * Displays individual achievement information
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getCategoryColor, calculateProgress, getProgressText } from '../utils';
import type { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
  onPress: (achievementId: string) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onPress,
}) => {
  const themeColors = useThemeColors();
  const categoryColor = getCategoryColor(achievement.category);
  const progressPercentage = calculateProgress(achievement);
  const progressText = getProgressText(achievement);

  return (
    <TouchableOpacity
      onPress={() => onPress(achievement.id)}
      style={{ marginBottom: Spacing.md }}
    >
      <Card 
        variant="default" 
        style={{
          opacity: achievement.isCompleted ? 1 : 0.8,
          borderWidth: achievement.isCompleted ? 2 : 1,
          borderColor: achievement.isCompleted ? categoryColor : themeColors.border.primary,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Achievement Icon */}
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: categoryColor + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
            position: 'relative',
          }}>
            <Ionicons 
              name={achievement.icon as any} 
              size={28} 
              color={categoryColor} 
            />
            
            {/* Completion Badge */}
            {achievement.isCompleted && (
              <View style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: Colors.secondary.success,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: themeColors.background.primary,
              }}>
                <Ionicons name="checkmark" size={12} color={Colors.neutral.white} />
              </View>
            )}
          </View>
          
          {/* Achievement Info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
              <Typography variant="bodyLarge" weight="semibold" style={{ flex: 1 }}>
                {achievement.title}
              </Typography>
              
              {/* Reward Badge */}
              <View style={{
                backgroundColor: categoryColor + '20',
                paddingHorizontal: Spacing.sm,
                paddingVertical: 2,
                borderRadius: BorderRadius.sm,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Ionicons name="diamond" size={12} color={categoryColor} style={{ marginRight: 4 }} />
                <Typography variant="caption" weight="medium" style={{ color: categoryColor }}>
                  {achievement.reward}
                </Typography>
              </View>
            </View>
            
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
              {achievement.description}
            </Typography>
            
            {/* Completion Date or Progress */}
            {achievement.isCompleted && achievement.completedDate ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar" size={14} color={themeColors.icon.secondary} style={{ marginRight: Spacing.xs }} />
                <Typography variant="bodySmall" color="secondary">
                  Completed {new Date(achievement.completedDate).toLocaleDateString()}
                </Typography>
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
                  <Typography variant="bodySmall" color="secondary">
                    Progress
                  </Typography>
                  <Typography variant="bodySmall" weight="medium">
                    {progressText}
                  </Typography>
                </View>
                
                {/* Progress Bar */}
                <View style={{
                  height: 6,
                  backgroundColor: themeColors.background.tertiary,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <View style={{
                    height: '100%',
                    width: `${progressPercentage}%`,
                    backgroundColor: categoryColor,
                    borderRadius: 3,
                  }} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
