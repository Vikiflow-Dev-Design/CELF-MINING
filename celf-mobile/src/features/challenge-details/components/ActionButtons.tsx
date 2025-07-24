/**
 * Action Buttons Component
 * Shows action buttons for challenge
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { ChallengeDetail } from '../types';

interface ActionButtonsProps {
  challenge: ChallengeDetail;
  isStarted: boolean;
  onStart: () => void;
  onShare: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  challenge,
  isStarted,
  onStart,
  onShare,
}) => {
  return (
    <View style={{ gap: Spacing.md }}>
      {/* Primary Action Button */}
      {challenge.isCompleted ? (
        <Button
          title="Challenge Completed!"
          variant="secondary"
          disabled
          icon={<Ionicons name="checkmark-circle" size={20} color={Colors.secondary.success} />}
          style={{
            backgroundColor: Colors.secondary.success + '20',
            borderColor: Colors.secondary.success,
          }}
        />
      ) : (
        <Button
          title={isStarted || challenge.isStarted ? "Continue Challenge" : "Start Challenge"}
          onPress={onStart}
          variant="primary"
          icon={<Ionicons name="play" size={20} color={Colors.neutral.white} />}
          style={{
            shadowColor: Colors.primary.blue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        />
      )}

      {/* Share Button */}
      <Button
        title="Share Challenge"
        onPress={onShare}
        variant="secondary"
        icon={<Ionicons name="share-outline" size={20} color={Colors.primary.blue} />}
      />
    </View>
  );
};

export default ActionButtons;
