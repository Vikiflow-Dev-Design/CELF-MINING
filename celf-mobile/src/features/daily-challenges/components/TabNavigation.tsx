/**
 * Tab Navigation Component
 * Shows tab navigation for different challenge types
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import type { ChallengeTab, TabKey } from '../types';

interface TabNavigationProps {
  tabs: ChallengeTab[];
  selectedTab: TabKey;
  onTabChange: (tabKey: TabKey) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  selectedTab,
  onTabChange,
}) => {
  return (
    <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabChange(tab.key as TabKey)}
          style={{
            flex: 1,
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.md,
            backgroundColor: selectedTab === tab.key 
              ? Colors.primary.blue 
              : Colors.background.primary,
            borderRadius: BorderRadius.md,
            borderWidth: 1,
            borderColor: selectedTab === tab.key 
              ? Colors.primary.blue 
              : Colors.border.primary,
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="bodyMedium" 
            weight="semibold"
            style={{ 
              color: selectedTab === tab.key ? Colors.neutral.white : Colors.text.primary 
            }}
          >
            {tab.label}
          </Typography>
          <Typography 
            variant="bodySmall" 
            style={{ 
              color: selectedTab === tab.key ? Colors.neutral.white : Colors.text.secondary,
              opacity: 0.8,
              marginTop: 2,
            }}
          >
            {tab.challenges.length} challenges
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};
