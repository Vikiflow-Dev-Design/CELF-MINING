import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';

interface MiningSession {
  estimatedRate: number;
  bonusMultiplier: number;
  sessionDuration: string;
  energyCost: number;
  networkFee: number;
}

export interface MiningConfirmationModalProps {
  isVisible: boolean;
  sessionType?: 'standard' | 'boost' | 'extended';
  onConfirm: () => void;
  onCancel: () => void;
}

export const MiningConfirmationModal: React.FC<MiningConfirmationModalProps> = ({
  isVisible,
  sessionType = 'standard',
  onConfirm,
  onCancel
}) => {
  const [isStarting, setIsStarting] = useState(false);

  // Mock mining session data
  const miningSession: MiningSession = {
    estimatedRate: sessionType === 'boost' ? 2.5 : 1.2,
    bonusMultiplier: sessionType === 'boost' ? 2.0 : 1.0,
    sessionDuration: sessionType === 'boost' ? '30 minutes' : '60 minutes',
    energyCost: sessionType === 'boost' ? 15 : 10,
    networkFee: 0.01
  };

  const getSessionTypeInfo = () => {
    switch (sessionType) {
      case 'boost':
        return {
          title: 'Boost Mining Session',
          description: 'Enhanced mining with 2x rewards for 30 minutes',
          icon: 'flash',
          color: Colors.secondary.warning
        };
      case 'extended':
        return {
          title: 'Extended Mining Session',
          description: 'Longer mining session with steady rewards',
          icon: 'time',
          color: Colors.secondary.info
        };
      default:
        return {
          title: 'Standard Mining Session',
          description: 'Regular mining session with standard rewards',
          icon: 'diamond',
          color: Colors.primary.blue
        };
    }
  };

  const sessionInfo = getSessionTypeInfo();
  const estimatedReward = miningSession.estimatedRate * (sessionType === 'boost' ? 0.5 : 1);

  const handleConfirm = async () => {
    setIsStarting(true);
    
    // Simulate mining session start
    setTimeout(() => {
      setIsStarting(false);
      onConfirm();
      
      Alert.alert(
        'Mining Started!',
        `Your ${sessionInfo.title.toLowerCase()} has begun. You can monitor progress from the mining screen.`
      );
    }, 2000);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Layout.screenMargin.mobile,
      }}>
        <Card 
          variant="default" 
          style={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: Colors.background.primary,
            borderRadius: BorderRadius.xl,
            shadowColor: Colors.neutral.black,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: sessionInfo.color + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name={sessionInfo.icon as any} size={40} color={sessionInfo.color} />
            </View>
            
            <Typography variant="h2" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              Start Mining?
            </Typography>
            
            <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center' }}>
              {sessionInfo.description}
            </Typography>
          </View>

          {/* Mining Rate Display */}
          <Card 
            variant="default" 
            style={{ 
              backgroundColor: sessionInfo.color + '10',
              borderWidth: 1,
              borderColor: sessionInfo.color + '30',
              marginBottom: Spacing['2xl']
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xs }}>
                Estimated Mining Rate
              </Typography>
              <Typography variant="displaySmall" weight="bold" style={{ color: sessionInfo.color }}>
                {miningSession.estimatedRate} CELF/hour
              </Typography>
              {miningSession.bonusMultiplier > 1 && (
                <View style={{
                  backgroundColor: Colors.secondary.success + '20',
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: BorderRadius.full,
                  marginTop: Spacing.sm,
                }}>
                  <Typography variant="bodySmall" style={{ color: Colors.secondary.success }} weight="bold">
                    {miningSession.bonusMultiplier}x BONUS ACTIVE
                  </Typography>
                </View>
              )}
            </View>
          </Card>

          {/* Session Details */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Session Details
            </Typography>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Duration</Typography>
                <Typography variant="bodyMedium" weight="semibold">{miningSession.sessionDuration}</Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Estimated Reward</Typography>
                <Typography variant="bodyMedium" weight="semibold" color="primary">
                  ~{estimatedReward.toFixed(2)} CELF
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Energy Cost</Typography>
                <Typography variant="bodyMedium" weight="semibold">
                  {miningSession.energyCost}%
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Network Fee</Typography>
                <Typography variant="bodyMedium" weight="semibold">
                  {miningSession.networkFee} CELF
                </Typography>
              </View>
              
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: Spacing.md,
                borderTopWidth: 1,
                borderTopColor: Colors.border.primary,
              }}>
                <Typography variant="bodyLarge" weight="bold">Net Reward</Typography>
                <Typography variant="bodyLarge" weight="bold" color="primary">
                  ~{(estimatedReward - miningSession.networkFee).toFixed(2)} CELF
                </Typography>
              </View>
            </View>
          </View>

          {/* Important Notes */}
          <View style={{
            backgroundColor: Colors.secondary.info + '10',
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing['2xl'],
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="information-circle" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                  • Mining rewards are estimates and may vary based on network conditions
                  {'\n'}• You can pause or stop mining at any time
                  {'\n'}• Keep the app open for optimal mining performance
                  {sessionType === 'boost' && '\n• Boost sessions consume more device energy'}
                </Typography>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            <Button
              title={isStarting ? "Starting Mining..." : "Confirm & Start Mining"}
              onPress={handleConfirm}
              variant="primary"
              disabled={isStarting}
              loading={isStarting}
              icon={!isStarting ? <Ionicons name="play" size={20} color={Colors.neutral.white} /> : undefined}
              style={{
                shadowColor: sessionInfo.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            />
            
            <Button
              title="Cancel"
              onPress={handleCancel}
              variant="secondary"
              disabled={isStarting}
              icon={<Ionicons name="close" size={20} color={Colors.text.secondary} />}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};
