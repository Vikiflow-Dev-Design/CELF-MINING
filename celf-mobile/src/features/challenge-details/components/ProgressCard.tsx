/**
 * Progress Card Component
 * Shows challenge progress and reward information
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography, ProgressBar } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { ChallengeDetail } from '../types';

interface ProgressCardProps {
  challenge: ChallengeDetail;
  progressPercentage: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  challenge,
  progressPercentage,
}) => {
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
          <Ionicons name="trophy" size={20} color={Colors.secondary.success} />
        </View>
        <Typography variant="h3" weight="semibold">
          Progress & Reward
        </Typography>
      </View>

      {/* Progress Section */}
      <View style={{ marginBottom: Spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
          <Typography variant="bodyMedium" color="secondary">
            Progress
          </Typography>
          <Typography variant="bodyMedium" weight="semibold">
            {challenge.progress}/{challenge.maxProgress}
          </Typography>
        </View>
        
        <ProgressBar 
          progress={progressPercentage} 
          color={challenge.isCompleted ? Colors.secondary.success : Colors.primary.blue}
          style={{ marginBottom: Spacing.sm }}
        />
        
        <Typography variant="bodySmall" color="secondary">
          {challenge.isCompleted ? 'Challenge completed!' : `${Math.round(progressPercentage)}% complete`}
        </Typography>
      </View>

      {/* Reward Section */}
      <View style={{
        backgroundColor: Colors.secondary.success + '10',
        padding: Spacing.md,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="diamond" size={20} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
          <Typography variant="bodyMedium" weight="semibold">
            Reward
          </Typography>
        </View>
        <Typography variant="h3" weight="bold" style={{ color: Colors.secondary.success }}>
          {challenge.reward} CELF
        </Typography>
      </View>

      {/* Time Limit */}
      {challenge.timeLimit && (
        <View style={{
          marginTop: Spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography variant="bodyMedium" color="secondary">
            Time Limit
          </Typography>
          <Typography variant="bodyMedium" weight="semibold">
            {challenge.timeLimit}
          </Typography>
        </View>
      )}

      {/* Expires In */}
      <View style={{
        marginTop: Spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="bodyMedium" color="secondary">
          Expires In
        </Typography>
        <Typography variant="bodyMedium" weight="semibold" style={{ color: Colors.secondary.warning }}>
          {challenge.expiresIn}
        </Typography>
      </View>
    </Card>
  );
};
