/**
 * Challenge Item Component
 * Individual challenge card component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { getDifficultyColor, getTypeColor, calculateProgressPercentage } from '../utils';
import type { Challenge } from '../types';

interface ChallengeItemProps {
  challenge: Challenge;
  onPress: (challenge: Challenge) => void;
}

export const ChallengeItem: React.FC<ChallengeItemProps> = ({
  challenge,
  onPress,
}) => {
  const progressPercentage = calculateProgressPercentage(challenge.progress, challenge.maxProgress);

  return (
    <TouchableOpacity
      onPress={() => onPress(challenge)}
      style={{ marginBottom: Spacing.md }}
    >
      <Card 
        variant="default" 
        style={{
          opacity: challenge.isCompleted ? 0.9 : 1,
          borderWidth: challenge.isCompleted ? 2 : 1,
          borderColor: challenge.isCompleted ? Colors.secondary.success : Colors.border.primary,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: getTypeColor(challenge.type) + (challenge.isCompleted ? 'FF' : '20'),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons 
              name={challenge.icon as any} 
              size={24} 
              color={challenge.isCompleted ? Colors.neutral.white : getTypeColor(challenge.type)} 
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Typography variant="bodyLarge" weight="semibold" numberOfLines={1}>
                  {challenge.title}
                </Typography>
                <Typography variant="bodySmall" color="secondary" numberOfLines={2}>
                  {challenge.description}
                </Typography>
              </View>
              
              <View style={{ alignItems: 'flex-end', marginLeft: Spacing.sm }}>
                <Typography variant="bodyMedium" weight="bold" color="primary">
                  +{challenge.reward} CELF
                </Typography>
                <View style={{
                  backgroundColor: getDifficultyColor(challenge.difficulty) + '20',
                  paddingHorizontal: Spacing.sm,
                  paddingVertical: 2,
                  borderRadius: BorderRadius.sm,
                  marginTop: Spacing.xs,
                }}>
                  <Typography variant="bodySmall" style={{ color: getDifficultyColor(challenge.difficulty) }} weight="medium">
                    {challenge.difficulty.toUpperCase()}
                  </Typography>
                </View>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={{ marginBottom: Spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
                <Typography variant="bodySmall" color="secondary">
                  Progress
                </Typography>
                <Typography variant="bodySmall" weight="medium">
                  {challenge.progress}/{challenge.maxProgress}
                </Typography>
              </View>
              <View style={{
                height: 6,
                backgroundColor: Colors.background.tertiary,
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: `${progressPercentage}%`,
                  backgroundColor: getTypeColor(challenge.type),
                  borderRadius: 3,
                }} />
              </View>
            </View>

            {/* Status and Timer */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {challenge.isCompleted ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} />
                  <Typography variant="bodySmall" color="success" style={{ marginLeft: Spacing.xs }}>
                    Completed
                  </Typography>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time" size={16} color={Colors.text.secondary} />
                  <Typography variant="bodySmall" color="secondary" style={{ marginLeft: Spacing.xs }}>
                    {challenge.expiresIn} left
                  </Typography>
                </View>
              )}
              
              <TouchableOpacity
                onPress={() => onPress(challenge)}
                style={{
                  backgroundColor: challenge.isCompleted ? Colors.secondary.success : getTypeColor(challenge.type),
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: BorderRadius.md,
                }}
              >
                <Typography variant="bodySmall" color="inverse" weight="semibold">
                  {challenge.isCompleted ? 'Completed' : 'Start'}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
