/**
 * Mining Button Component
 * Main mining button with animations and countdown timer
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { formatTime } from '../utils';
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

interface MiningButtonProps {
  isMining: boolean;
  timeRemaining: number;
  miningButtonScale: SharedValue<number>;
  timerOpacity: SharedValue<number>;
  timerScale: SharedValue<number>;
  onPress: () => void;
}

export const MiningButton: React.FC<MiningButtonProps> = ({
  isMining,
  timeRemaining,
  miningButtonScale,
  timerOpacity,
  timerScale,
  onPress,
}) => {
  const themeColors = useThemeColors();
  const miningButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: miningButtonScale.value }],
  }));

  const timerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: timerOpacity.value,
    transform: [{ scale: timerScale.value }],
  }));

  return (
    <View style={{ alignItems: 'center', marginBottom: Spacing['3xl'] }}>
      <Animated.View style={miningButtonStyle}>
        <TouchableOpacity
          onPress={onPress}
          disabled={isMining} // Disable button when mining is active
          style={{
            width: 192,
            height: 192,
            borderRadius: 96,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isMining ? themeColors.accent.main : themeColors.primary.blue,
            shadow: `0 8px 24px ${isMining ? themeColors.accent.main : themeColors.primary.blue}4D`,
            elevation: 12,
            opacity: 1,
          }}>
          <Ionicons
            name="diamond"
            size={64}
            color={themeColors.icon.inverse}
          />
          <Typography
            variant="bodyLarge"
            color="inverse"
            weight="bold"
            style={{ marginTop: Spacing.xs }}>
            {isMining ? 'Mining...' : 'Start Mining'}
          </Typography>
        </TouchableOpacity>
      </Animated.View>

      {/* Countdown Timer - Always reserve space */}
      <View style={{
        height: 48, // Fixed height to prevent layout shift
        marginTop: Spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {isMining && (
          <Animated.View style={[
            timerAnimatedStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.background.primary,
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.md,
              borderRadius: 20,
              shadow: '0 2px 4px #0000001A',
              elevation: 3,
            }
          ]}>
            <Ionicons name="time" size={20} color={Colors.secondary.warning} />
            <Typography
              variant="bodyMedium"
              weight="semibold"
              style={{ marginLeft: Spacing.sm }}>
              {formatTime(timeRemaining)}
            </Typography>
          </Animated.View>
        )}
      </View>
    </View>
  );
};
