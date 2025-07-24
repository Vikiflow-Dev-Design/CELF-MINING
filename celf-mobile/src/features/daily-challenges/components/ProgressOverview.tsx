/**
 * Progress Overview Component
 * Shows today's challenge progress overview
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';

interface ProgressOverviewProps {
  completedToday: number;
  totalChallenges: number;
  totalRewardsToday: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  completedToday,
  totalChallenges,
  totalRewardsToday,
}) => {
  const themeColors = useThemeColors();
  return (
    <Card 
      variant="gradient" 
      gradientColors={[Colors.secondary.success, Colors.secondary.success + 'CC']}
      style={{
        backgroundColor: Colors.secondary.success,
        boxShadow: `0 8px 16px ${themeColors.isDark ? themeColors.background.primary : Colors.secondary.success}4D`,
        elevation: 8,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Typography variant="displaySmall" color="inverse" weight="bold">
            {completedToday}
          </Typography>
          <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
            Completed Today
          </Typography>
        </View>
        
        <View style={{
          width: 1,
          height: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }} />
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Typography variant="displaySmall" color="inverse" weight="bold">
            {totalChallenges}
          </Typography>
          <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
            Daily Challenges
          </Typography>
        </View>
        
        <View style={{
          width: 1,
          height: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }} />
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Typography variant="displaySmall" color="inverse" weight="bold">
            {totalRewardsToday}
          </Typography>
          <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
            CELF Earned
          </Typography>
        </View>
      </View>
    </Card>
  );
};
