/**
 * Quick Solutions Component
 * Shows quick solutions for the error
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface QuickSolutionsProps {
  solutions: string[];
}

export const QuickSolutions: React.FC<QuickSolutionsProps> = ({ solutions }) => {
  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.secondary.info + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="bulb" size={20} color={Colors.secondary.info} />
        </View>
        <Typography variant="h3" weight="semibold">
          Quick Solutions
        </Typography>
      </View>
      
      <View style={{ gap: Spacing.sm }}>
        {solutions.map((solution, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Typography variant="bodyMedium" color="secondary" style={{ marginRight: Spacing.sm }}>
              {index + 1}.
            </Typography>
            <Typography variant="bodyMedium" color="secondary" style={{ flex: 1, lineHeight: 20 }}>
              {solution}
            </Typography>
          </View>
        ))}
      </View>
    </Card>
  );
};
