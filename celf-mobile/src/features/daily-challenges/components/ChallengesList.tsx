/**
 * Challenges List Component
 * Shows list of challenges with empty state
 */

import React from 'react';
import { View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { ChallengeItem } from './ChallengeItem';
import type { Challenge } from '../types';

interface ChallengesListProps {
  challenges: Challenge[];
  onChallengePress: (challenge: Challenge) => void;
}

export const ChallengesList: React.FC<ChallengesListProps> = ({
  challenges,
  onChallengePress,
}) => {
  const EmptyState = () => (
    <View style={{ alignItems: 'center', paddingTop: Spacing['3xl'] }}>
      <Ionicons name="trophy-outline" size={64} color={Colors.text.tertiary} />
      <Typography variant="h3" weight="semibold" style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>
        No challenges available
      </Typography>
      <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center' }}>
        Check back later for new challenges
      </Typography>
    </View>
  );

  return (
    <FlatList
      data={challenges}
      renderItem={({ item }) => (
        <ChallengeItem 
          challenge={item} 
          onPress={onChallengePress} 
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingBottom: 32,
      }}
      ListEmptyComponent={<EmptyState />}
      showsVerticalScrollIndicator={false}
    />
  );
};
