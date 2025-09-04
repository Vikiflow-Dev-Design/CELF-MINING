/**
 * Task Card Component
 * Displays individual task information
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getCategoryColor, calculateProgress, getProgressText } from '../utils';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onPress: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
}) => {
  const themeColors = useThemeColors();
  const categoryColor = getCategoryColor(task.category);
  const progressPercentage = calculateProgress(task);
  const progressText = getProgressText(task);

  return (
    <TouchableOpacity
      onPress={() => onPress(task.id)}
      style={{ marginBottom: Spacing.md }}
    >
      <Card 
        variant="default" 
        style={{
          opacity: task.isCompleted ? 1 : 0.8,
          borderWidth: task.isCompleted ? 2 : 1,
          borderColor: task.isCompleted ? categoryColor : themeColors.border.primary,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Task Icon */}
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
              name={task.icon as any} 
              size={28} 
              color={categoryColor} 
            />
            
            {/* Completion Badge */}
            {task.isCompleted && (
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
          
          {/* Task Info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
              <Typography variant="bodyLarge" weight="semibold" style={{ flex: 1 }}>
                {task.title}
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
                  {task.reward}
                </Typography>
              </View>
            </View>
            
            <Typography 
              variant="bodyMedium" 
              color="secondary" 
              style={{ marginBottom: Spacing.sm }}
              numberOfLines={2}
            >
              {task.description}
            </Typography>
            
            {/* Progress Bar */}
            <View style={{ marginBottom: Spacing.xs }}>
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
            
            {/* Progress Text */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="secondary">
                {progressText}
              </Typography>
              
              {task.isCompleted && !task.rewardClaimed && (
                <View style={{
                  backgroundColor: Colors.secondary.success + '20',
                  paddingHorizontal: Spacing.xs,
                  paddingVertical: 2,
                  borderRadius: BorderRadius.xs,
                }}>
                  <Typography variant="caption" weight="medium" style={{ color: Colors.secondary.success }}>
                    Claim Reward
                  </Typography>
                </View>
              )}
              
              {task.rewardClaimed && (
                <View style={{
                  backgroundColor: themeColors.background.tertiary,
                  paddingHorizontal: Spacing.xs,
                  paddingVertical: 2,
                  borderRadius: BorderRadius.xs,
                }}>
                  <Typography variant="caption" color="tertiary">
                    Claimed
                  </Typography>
                </View>
              )}
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
