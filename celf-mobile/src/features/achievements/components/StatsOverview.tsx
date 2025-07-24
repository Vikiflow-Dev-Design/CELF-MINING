/**
 * Stats Overview Component
 * Displays achievement statistics overview
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface StatsOverviewProps {
  completedCount: number;
  totalCount: number;
  totalRewards: number;
  completionPercentage: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  completedCount,
  totalCount,
  totalRewards,
  completionPercentage,
}) => {
  return (
    <Card 
      variant="gradient" 
      gradientColors={[Colors.primary.blue, Colors.primary.light]}
      style={{ 
        backgroundColor: Colors.primary.blue,
        shadowColor: Colors.primary.blue,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      <View style={{ alignItems: 'center', paddingVertical: Spacing.md }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing.lg,
        }}>
          <Ionicons name="trophy" size={40} color={Colors.neutral.white} />
        </View>
        
        <Typography variant="h2" color="inverse" weight="bold" style={{ marginBottom: Spacing.sm }}>
          Your Achievements
        </Typography>
        
        <Typography variant="bodyLarge" color="inverse" style={{ 
          textAlign: 'center', 
          marginBottom: Spacing.lg,
          opacity: 0.9 
        }}>
          Track your progress and unlock rewards
        </Typography>
        
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          width: '100%',
          paddingTop: Spacing.md,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
        }}>
          <View style={{ alignItems: 'center' }}>
            <Typography variant="h1" color="inverse" weight="bold">
              {completedCount}
            </Typography>
            <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
              Completed
            </Typography>
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <Typography variant="h1" color="inverse" weight="bold">
              {completionPercentage}%
            </Typography>
            <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
              Progress
            </Typography>
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <Typography variant="h1" color="inverse" weight="bold">
              {totalRewards}
            </Typography>
            <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
              CELF Earned
            </Typography>
          </View>
        </View>
      </View>
    </Card>
  );
};
