/**
 * Instructions Component
 * Shows challenge instructions and tips
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { ChallengeDetail } from '../types';

interface InstructionsProps {
  challenge: ChallengeDetail;
}

export const Instructions: React.FC<InstructionsProps> = ({
  challenge,
}) => {
  return (
    <View style={{ gap: Spacing['2xl'] }}>
      {/* Instructions */}
      <Card variant="default">
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.primary.blue + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons name="list" size={20} color={Colors.primary.blue} />
          </View>
          <Typography variant="h3" weight="semibold">
            Instructions
          </Typography>
        </View>

        <View style={{ gap: Spacing.md }}>
          {challenge.instructions.map((instruction, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: Colors.primary.blue,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
                marginTop: 2,
              }}>
                <Typography variant="bodySmall" color="inverse" weight="bold">
                  {index + 1}
                </Typography>
              </View>
              <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                {instruction}
              </Typography>
            </View>
          ))}
        </View>
      </Card>

      {/* Tips */}
      <Card variant="default">
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.secondary.warning + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.md,
          }}>
            <Ionicons name="bulb" size={20} color={Colors.secondary.warning} />
          </View>
          <Typography variant="h3" weight="semibold">
            Tips for Success
          </Typography>
        </View>

        <View style={{ gap: Spacing.md }}>
          {challenge.tips.map((tip, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color={Colors.secondary.success} 
                style={{ marginRight: Spacing.md, marginTop: 2 }}
              />
              <Typography variant="bodyMedium" style={{ flex: 1, lineHeight: 22 }}>
                {tip}
              </Typography>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};
