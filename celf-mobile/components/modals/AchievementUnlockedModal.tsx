import React, { useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'mining' | 'social' | 'wallet' | 'milestone';
  reward: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementUnlockedModalProps {
  isVisible: boolean;
  achievement: Achievement;
  onClose: () => void;
  onViewAchievements?: () => void;
  onClaimReward?: () => void;
}

export const AchievementUnlockedModal: React.FC<AchievementUnlockedModalProps> = ({
  isVisible,
  achievement,
  onClose,
  onViewAchievements,
  onClaimReward
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  const { width } = Dimensions.get('window');

  useEffect(() => {
    if (isVisible) {
      // Start animations when modal becomes visible
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(confettiAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Reset animations when modal is hidden
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      glowAnim.setValue(0);
      confettiAnim.setValue(0);
    }
  }, [isVisible]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return Colors.secondary.success;
      case 'rare': return Colors.secondary.info;
      case 'epic': return Colors.secondary.warning;
      case 'legendary': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common': return [Colors.secondary.success, Colors.secondary.success + 'CC'];
      case 'rare': return [Colors.secondary.info, Colors.secondary.info + 'CC'];
      case 'epic': return [Colors.secondary.warning, Colors.secondary.warning + 'CC'];
      case 'legendary': return [Colors.secondary.error, Colors.secondary.error + 'CC'];
      default: return [Colors.primary.blue, Colors.primary.blue + 'CC'];
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mining': return Colors.secondary.warning;
      case 'social': return Colors.secondary.success;
      case 'wallet': return Colors.secondary.info;
      case 'milestone': return Colors.secondary.error;
      default: return Colors.primary.blue;
    }
  };

  const handleClaimReward = () => {
    onClaimReward?.();
    onClose();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Layout.screenMargin.mobile,
      }}>
        {/* Confetti Effect */}
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: confettiAnim,
        }}>
          {[...Array(20)].map((_, index) => (
            <Animated.View
              key={index}
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                backgroundColor: getRarityColor(achievement.rarity),
                left: Math.random() * width,
                top: Math.random() * 200,
                transform: [{
                  translateY: confettiAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 800],
                  })
                }],
              }}
            />
          ))}
        </Animated.View>

        <Animated.View style={{
          transform: [{ scale: scaleAnim }],
          width: '100%',
          maxWidth: 400,
        }}>
          <Card 
            variant="gradient"
            gradientColors={getRarityGradient(achievement.rarity)}
            style={{
              backgroundColor: getRarityColor(achievement.rarity),
              borderRadius: BorderRadius.xl,
              shadowColor: getRarityColor(achievement.rarity),
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.5,
              shadowRadius: 25,
              elevation: 15,
              alignItems: 'center',
            }}
          >
            {/* Achievement Icon with Glow */}
            <Animated.View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
              transform: [{ rotate: spin }, { scale: glow }],
            }}>
              <Ionicons name={achievement.icon as any} size={60} color={Colors.neutral.white} />
            </Animated.View>
            
            {/* Achievement Unlocked Text */}
            <Typography variant="h1" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              🎉 ACHIEVEMENT UNLOCKED! 🎉
            </Typography>
            
            {/* Achievement Title */}
            <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              {achievement.title}
            </Typography>
            
            {/* Rarity Badge */}
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
              marginBottom: Spacing.md,
            }}>
              <Typography variant="bodyMedium" color="inverse" weight="bold">
                {achievement.rarity.toUpperCase()} ACHIEVEMENT
              </Typography>
            </View>
            
            {/* Achievement Description */}
            <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9, marginBottom: Spacing.lg }}>
              {achievement.description}
            </Typography>
            
            {/* Reward Display */}
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.xl,
              paddingVertical: Spacing.lg,
              borderRadius: BorderRadius.lg,
              marginBottom: Spacing.xl,
              alignItems: 'center',
            }}>
              <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                Reward Earned
              </Typography>
              <Typography variant="displaySmall" color="inverse" weight="bold">
                +{achievement.reward} CELF
              </Typography>
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md, marginTop: Spacing.lg }}>
            <Button
              title="Claim Reward"
              onPress={handleClaimReward}
              variant="primary"
              icon={<Ionicons name="gift" size={20} color={Colors.neutral.white} />}
              style={{
                backgroundColor: getRarityColor(achievement.rarity),
                borderColor: getRarityColor(achievement.rarity),
                shadowColor: getRarityColor(achievement.rarity),
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            />
            
            <View style={{ flexDirection: 'row', gap: Spacing.md }}>
              <Button
                title="View All Achievements"
                onPress={() => {
                  onViewAchievements?.();
                  onClose();
                }}
                variant="secondary"
                icon={<Ionicons name="trophy" size={20} color={Colors.text.primary} />}
                style={{ flex: 1 }}
              />
              
              <Button
                title="Close"
                onPress={onClose}
                variant="secondary"
                icon={<Ionicons name="close" size={20} color={Colors.text.primary} />}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
