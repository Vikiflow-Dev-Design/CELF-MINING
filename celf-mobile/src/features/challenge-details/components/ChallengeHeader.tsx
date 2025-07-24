/**
 * Challenge Header Component
 * Header card for challenge details screen
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { getTypeColor, getTypeName, getDifficultyColor } from '../utils';
import type { ChallengeDetail } from '../types';

interface ChallengeHeaderProps {
  challenge: ChallengeDetail;
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  challenge,
}) => {
  return (
    <Card 
      variant="gradient" 
      gradientColors={[getTypeColor(challenge.type), getTypeColor(challenge.type) + 'CC']}
      style={{ 
        backgroundColor: getTypeColor(challenge.type),
        shadowColor: getTypeColor(challenge.type),
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: Spacing['2xl'],
        alignItems: 'center'
      }}
    >
      <View style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
      }}>
        <Ionicons 
          name={challenge.icon as any} 
          size={40} 
          color={Colors.neutral.white} 
        />
      </View>
      
      <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
        {challenge.title}
      </Typography>
      
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: Spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
      }}>
        <Ionicons name="flag" size={16} color={Colors.neutral.white} style={{ marginRight: Spacing.sm }} />
        <Typography variant="bodyMedium" color="inverse" weight="semibold">
          {getTypeName(challenge.type)}
        </Typography>
      </View>

      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: Spacing.lg,
        backgroundColor: getDifficultyColor(challenge.difficulty) + '40',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
      }}>
        <Typography variant="bodySmall" color="inverse" weight="bold">
          {challenge.difficulty.toUpperCase()} DIFFICULTY
        </Typography>
      </View>

      <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
        {challenge.description}
      </Typography>
    </Card>
  );
};
