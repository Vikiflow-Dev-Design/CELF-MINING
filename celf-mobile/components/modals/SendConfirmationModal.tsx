import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Animated, Dimensions, PanResponder, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';

const { height: screenHeight } = Dimensions.get('window');

interface Recipient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress?: string | null;
}

interface SendConfirmationModalProps {
  isVisible: boolean;
  recipient: Recipient;
  amount: string;
  memo?: string;
  fee: number;
  formattedAmount: string;
  formattedFee: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SendConfirmationModal: React.FC<SendConfirmationModalProps> = ({
  isVisible,
  recipient,
  amount,
  memo,
  fee,
  formattedAmount,
  formattedFee,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        onCancel();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
    >
      {/* Backdrop */}
      <TouchableOpacity 
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        activeOpacity={1}
        onPress={onCancel}
      >
        {/* Bottom Sheet */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: Colors.background.primary,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: Spacing.md,
            paddingHorizontal: Spacing.lg,
            paddingBottom: Math.max(Spacing.xl, 34), // Ensure space for buttons + safe area
            maxHeight: screenHeight * 0.85,
            minHeight: 400, // Minimum height to ensure buttons are visible
            transform: [{ translateY: slideAnim }],
          }}
          {...panResponder.panHandlers}
        >
          {/* Handle */}
          <View style={{
            width: 40,
            height: 4,
            backgroundColor: Colors.border.secondary,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: Spacing.lg,
          }} />

          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Spacing.xl,
          }}>
            <Typography variant="h2" weight="bold">
              Confirm Transaction
            </Typography>
            <TouchableOpacity onPress={onCancel}>
              <Ionicons name="close" size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Spacing.md }}
          >
            {/* Transaction Summary */}
          <Card style={{ marginBottom: Spacing.lg }}>
            <View style={{
              alignItems: 'center',
              paddingVertical: Spacing.lg,
            }}>
              <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xs }}>
                You're sending
              </Typography>
              <Typography variant="h1" weight="bold" color="primary" style={{ marginBottom: Spacing.sm }}>
                {formattedAmount}
              </Typography>
              <Typography variant="bodyMedium" color="secondary">
                to {recipient.firstName} {recipient.lastName}
              </Typography>
            </View>
          </Card>

          {/* Recipient Details */}
          <Card style={{ marginBottom: Spacing.lg }}>
            <View style={{ padding: Spacing.md }}>
              <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.md }}>
                Recipient Details
              </Typography>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.primary.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Typography variant="bodyMedium" color="inverse" weight="bold">
                    {recipient.firstName.charAt(0)}{recipient.lastName.charAt(0)}
                  </Typography>
                </View>
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" weight="semibold">
                    {recipient.firstName} {recipient.lastName}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {recipient.email}
                  </Typography>
                </View>
              </View>
              
              <View style={{
                backgroundColor: Colors.background.secondary,
                padding: Spacing.sm,
                borderRadius: BorderRadius.sm,
                marginTop: Spacing.sm,
              }}>
                <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xs }}>
                  Wallet Address
                </Typography>
                <Typography variant="bodySmall" style={{ fontFamily: 'monospace' }}>
                  {recipient.walletAddress ?
                    `${recipient.walletAddress.slice(0, 20)}...${recipient.walletAddress.slice(-12)}` :
                    'No wallet address available'
                  }
                </Typography>
              </View>
            </View>
          </Card>

          {/* Transaction Details */}
          <Card style={{ marginBottom: Spacing.xl }}>
            <View style={{ padding: Spacing.md }}>
              <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.md }}>
                Transaction Details
              </Typography>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                <Typography variant="bodyMedium" color="secondary">Amount</Typography>
                <Typography variant="bodyMedium" weight="semibold">{formattedAmount}</Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                <Typography variant="bodyMedium" color="secondary">Network Fee</Typography>
                <Typography variant="bodyMedium" weight="semibold">{formattedFee}</Typography>
              </View>
              
              <View style={{
                height: 1,
                backgroundColor: Colors.border.primary,
                marginVertical: Spacing.sm,
              }} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: memo ? Spacing.sm : 0 }}>
                <Typography variant="bodyMedium" weight="semibold">Total</Typography>
                <Typography variant="bodyMedium" weight="bold" color="primary">
                  {formattedAmount}
                </Typography>
              </View>
              
              {memo && (
                <>
                  <View style={{
                    height: 1,
                    backgroundColor: Colors.border.primary,
                    marginVertical: Spacing.sm,
                  }} />
                  <View>
                    <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.xs }}>
                      Memo
                    </Typography>
                    <Typography variant="bodyMedium">
                      {memo}
                    </Typography>
                  </View>
                </>
              )}
            </View>
          </Card>
          </ScrollView>

          {/* Action Buttons */}
          <View style={{
            flexDirection: 'row',
            gap: Spacing.md,
            paddingTop: Spacing.md,
            borderTopWidth: 1,
            borderTopColor: Colors.border.primary,
            marginTop: Spacing.md,
          }}>
            <Button
              title="Cancel"
              variant="secondary"
              onPress={onCancel}
              style={{
                flex: 1,
                paddingVertical: Spacing.md,
              }}
              disabled={isLoading}
            />
            <Button
              title={isLoading ? 'Sending...' : 'Confirm & Send'}
              variant="primary"
              onPress={onConfirm}
              style={{
                flex: 1,
                paddingVertical: Spacing.md,
              }}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
