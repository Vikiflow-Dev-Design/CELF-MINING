import React, { useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity, Animated, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';

interface ReferralData {
  referredUser: string;
  bonusAmount: number;
  totalReferrals: number;
  nextMilestone: number;
  nextMilestoneReward: number;
}

export interface ReferralSuccessModalProps {
  isVisible: boolean;
  referralData: ReferralData;
  onClose: () => void;
  onShareMore?: () => void;
  onViewReferrals?: () => void;
}

export const ReferralSuccessModal: React.FC<ReferralSuccessModalProps> = ({
  isVisible,
  referralData,
  onClose,
  onShareMore,
  onViewReferrals
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Start animations when modal becomes visible
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Sparkle animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Reset animations when modal is hidden
      scaleAnim.setValue(0);
      bounceAnim.setValue(0);
      sparkleAnim.setValue(0);
    }
  }, [isVisible]);

  const handleShareMore = async () => {
    try {
      await Share.share({
        message: `Join me on CELF and start mining crypto! Use my referral code to get bonus tokens. Download now: https://celf.app/ref/${referralData.referredUser}`,
        title: 'Join CELF - Crypto Mining App',
      });
      onShareMore?.();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const progressToNextMilestone = (referralData.totalReferrals / referralData.nextMilestone) * 100;

  const bounce = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const sparkle = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Layout.screenMargin.mobile,
      }}>
        {/* Sparkle Effects */}
        {[...Array(8)].map((_, index) => (
          <Animated.View
            key={index}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              backgroundColor: Colors.secondary.warning,
              borderRadius: 2,
              left: `${20 + (index * 10)}%`,
              top: `${30 + (index % 2) * 40}%`,
              opacity: sparkle,
              transform: [{
                scale: sparkle.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1.5],
                })
              }],
            }}
          />
        ))}

        <Animated.View style={{
          transform: [{ scale: scaleAnim }],
          width: '100%',
          maxWidth: 400,
        }}>
          <Card 
            variant="gradient" 
            gradientColors={[Colors.secondary.success, Colors.secondary.success + 'CC']}
            style={{
              backgroundColor: Colors.secondary.success,
              borderRadius: BorderRadius.xl,
              shadowColor: Colors.secondary.success,
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.4,
              shadowRadius: 25,
              elevation: 15,
              alignItems: 'center',
            }}
          >
            {/* Success Icon with Bounce */}
            <Animated.View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
              transform: [{ scale: bounce }],
            }}>
              <Ionicons name="people" size={50} color={Colors.neutral.white} />
            </Animated.View>
            
            {/* Success Message */}
            <Typography variant="h1" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              🎉 Referral Success! 🎉
            </Typography>
            
            {/* Referred User */}
            <Typography variant="h3" color="inverse" weight="semibold" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
              {referralData.referredUser} joined CELF!
            </Typography>
            
            {/* Bonus Amount */}
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.xl,
              paddingVertical: Spacing.lg,
              borderRadius: BorderRadius.lg,
              marginBottom: Spacing.xl,
              alignItems: 'center',
            }}>
              <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                Referral Bonus Earned
              </Typography>
              <Typography variant="displaySmall" color="inverse" weight="bold">
                +{referralData.bonusAmount} CELF
              </Typography>
            </View>
          </Card>

          {/* Referral Stats */}
          <Card variant="default" style={{ marginTop: Spacing.lg, marginBottom: Spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.secondary.success + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="stats-chart" size={20} color={Colors.secondary.success} />
              </View>
              <Typography variant="h3" weight="semibold">
                Your Referral Progress
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Total Referrals</Typography>
                <Typography variant="bodyMedium" weight="bold" color="primary">
                  {referralData.totalReferrals}
                </Typography>
              </View>
              
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
                  <Typography variant="bodyMedium" color="secondary">Next Milestone</Typography>
                  <Typography variant="bodyMedium" weight="semibold">
                    {referralData.totalReferrals}/{referralData.nextMilestone}
                  </Typography>
                </View>
                
                <View style={{
                  height: 8,
                  backgroundColor: Colors.background.tertiary,
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginBottom: Spacing.sm,
                }}>
                  <View style={{
                    height: '100%',
                    width: `${Math.min(progressToNextMilestone, 100)}%`,
                    backgroundColor: Colors.secondary.success,
                    borderRadius: 4,
                  }} />
                </View>
                
                <Typography variant="bodySmall" color="secondary" style={{ textAlign: 'center' }}>
                  {referralData.nextMilestone - referralData.totalReferrals} more referrals to earn +{referralData.nextMilestoneReward} CELF
                </Typography>
              </View>
            </View>
          </Card>

          {/* Referral Benefits */}
          <Card variant="default" style={{ marginBottom: Spacing.lg }}>
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
                <Ionicons name="gift" size={20} color={Colors.secondary.info} />
              </View>
              <Typography variant="h3" weight="semibold">
                Referral Benefits
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodySmall">Earn bonus CELF for each successful referral</Typography>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodySmall">Your referrals get bonus tokens too</Typography>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodySmall">Unlock milestone rewards for multiple referrals</Typography>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodySmall">Build your CELF community network</Typography>
              </View>
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            <Button
              title="Share CELF with More Friends"
              onPress={handleShareMore}
              variant="primary"
              icon={<Ionicons name="share" size={20} color={Colors.neutral.white} />}
              style={{
                backgroundColor: Colors.secondary.success,
                borderColor: Colors.secondary.success,
                shadowColor: Colors.secondary.success,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 6,
              }}
            />
            
            <View style={{ flexDirection: 'row', gap: Spacing.md }}>
              <Button
                title="View All Referrals"
                onPress={() => {
                  onViewReferrals?.();
                  onClose();
                }}
                variant="secondary"
                icon={<Ionicons name="people-outline" size={20} color={Colors.text.primary} />}
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
