import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography, Card } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

const { height: screenHeight } = Dimensions.get('window');

interface TransactionResultModalProps {
  isVisible: boolean;
  isSuccess: boolean;
  title: string;
  message: string;
  transactionId?: string;
  amount?: string;
  recipientName?: string;
  onClose: () => void;
  onViewTransaction?: () => void;
}

export const TransactionResultModal: React.FC<TransactionResultModalProps> = ({
  isVisible,
  isSuccess,
  title,
  message,
  transactionId,
  amount,
  recipientName,
  onClose,
  onViewTransaction,
}) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    console.log('🎯 TransactionResultModal: useEffect triggered, isVisible:', isVisible);
    if (isVisible) {
      console.log('🎯 TransactionResultModal: Starting show animations...');
      // Slide up animation
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      // Scale animation for icon
      setTimeout(() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }).start();
      }, 200);
    } else {
      console.log('🎯 TransactionResultModal: Starting hide animations...');
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
      scaleAnim.setValue(0);
    }
  }, [isVisible]);

  console.log('🎯 TransactionResultModal: Render called', {
    isVisible,
    isSuccess,
    title,
    message,
    transactionId,
    amount,
    recipientName
  });

  if (!isVisible) {
    console.log('🎯 TransactionResultModal: Not visible, returning null');
    return null;
  }

  console.log('🎯 TransactionResultModal: Rendering modal...');
  const iconName = isSuccess ? 'checkmark-circle' : 'close-circle';
  const iconColor = isSuccess ? Colors.status.success : Colors.status.error;
  const backgroundColor = isSuccess
    ? Colors.status.success + '10'
    : Colors.status.error + '10';

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      {/* Backdrop */}
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      }}>
        {/* Bottom Sheet */}
        <Animated.View
          style={{
            backgroundColor: Colors.background.primary,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: Spacing.lg,
            paddingHorizontal: Spacing.lg,
            paddingBottom: Math.max(Spacing.xl, 34),
            minHeight: 400,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Handle */}
          <View style={{
            width: 40,
            height: 4,
            backgroundColor: Colors.border.secondary,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: Spacing.xl,
          }} />

          {/* Result Content */}
          <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
            {/* Animated Icon */}
            <Animated.View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.lg,
                transform: [{ scale: scaleAnim }],
              }}
            >
              <Ionicons
                name={iconName}
                size={48}
                color={iconColor}
              />
            </Animated.View>

            {/* Title */}
            <Typography 
              variant="h2" 
              weight="bold" 
              style={{ 
                textAlign: 'center', 
                marginBottom: Spacing.sm,
                color: isSuccess ? Colors.status.success : Colors.status.error
              }}
            >
              {title}
            </Typography>

            {/* Message */}
            <Typography 
              variant="bodyMedium" 
              color="secondary" 
              style={{ 
                textAlign: 'center', 
                marginBottom: Spacing.lg,
                lineHeight: 22
              }}
            >
              {message}
            </Typography>

            {/* Transaction Details (Success Only) */}
            {isSuccess && (amount || recipientName || transactionId) && (
              <Card style={{ width: '100%', marginBottom: Spacing.lg }}>
                <View style={{ padding: Spacing.md }}>
                  <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.sm }}>
                    Transaction Details
                  </Typography>
                  
                  {amount && recipientName && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
                      <Typography variant="bodyMedium" color="secondary">Amount Sent:</Typography>
                      <Typography variant="bodyMedium" weight="semibold">{amount}</Typography>
                    </View>
                  )}
                  
                  {recipientName && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs }}>
                      <Typography variant="bodyMedium" color="secondary">To:</Typography>
                      <Typography variant="bodyMedium" weight="semibold">{recipientName}</Typography>
                    </View>
                  )}
                  
                  {transactionId && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography variant="bodyMedium" color="secondary">Transaction ID:</Typography>
                      <Typography 
                        variant="bodySmall" 
                        weight="semibold" 
                        style={{ fontFamily: 'monospace', maxWidth: 120 }}
                        numberOfLines={1}
                      >
                        {transactionId}
                      </Typography>
                    </View>
                  )}
                </View>
              </Card>
            )}
          </View>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            {isSuccess && onViewTransaction && (
              <Button
                title="View Transaction"
                onPress={onViewTransaction}
                variant="secondary"
                icon={<Ionicons name="receipt" size={20} color={Colors.text.primary} />}
              />
            )}
            
            <Button
              title={isSuccess ? "Done" : "Try Again"}
              onPress={onClose}
              variant="primary"
              icon={
                <Ionicons 
                  name={isSuccess ? "checkmark" : "refresh"} 
                  size={20} 
                  color={Colors.neutral.white} 
                />
              }
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
