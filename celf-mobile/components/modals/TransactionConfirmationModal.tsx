import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';

interface TransactionDetails {
  type: 'send' | 'receive';
  amount: number;
  recipient: string;
  fee: number;
  message?: string;
  estimatedTime: string;
}

export interface TransactionConfirmationModalProps {
  isVisible: boolean;
  transaction: TransactionDetails;
  onConfirm: () => void;
  onCancel: () => void;
}

export const TransactionConfirmationModal: React.FC<TransactionConfirmationModalProps> = ({
  isVisible,
  transaction,
  onConfirm,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [requiresBiometric, setRequiresBiometric] = useState(true);
  const [biometricVerified, setBiometricVerified] = useState(false);

  const handleBiometricAuth = () => {
    // In a real app, this would trigger biometric authentication
    Alert.alert(
      'Biometric Authentication',
      'Use your fingerprint or face ID to confirm this transaction.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Authenticate', 
          onPress: () => {
            setBiometricVerified(true);
            Alert.alert('Authentication Successful', 'You can now proceed with the transaction.');
          }
        }
      ]
    );
  };

  const handleConfirm = async () => {
    if (requiresBiometric && !biometricVerified) {
      Alert.alert('Authentication Required', 'Please complete biometric authentication first.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
      
      Alert.alert(
        'Transaction Submitted',
        `Your transaction has been submitted to the network. You will receive a confirmation once it's processed.`
      );
    }, 3000);
  };

  const handleCancel = () => {
    if (isProcessing) {
      Alert.alert(
        'Cancel Transaction',
        'Are you sure you want to cancel this transaction? It may already be processing.',
        [
          { text: 'Keep Processing', style: 'cancel' },
          { text: 'Cancel', style: 'destructive', onPress: onCancel }
        ]
      );
    } else {
      onCancel();
    }
  };

  const totalAmount = transaction.amount + transaction.fee;

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
              backgroundColor: Colors.secondary.warning + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name="send" size={40} color={Colors.secondary.warning} />
            </View>
            
            <Typography variant="h2" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
              Confirm Transaction
            </Typography>
            
            <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center' }}>
              Please review the transaction details before confirming
            </Typography>
          </View>

          {/* Transaction Amount */}
          <Card 
            variant="default" 
            style={{ 
              backgroundColor: Colors.secondary.warning + '10',
              borderWidth: 1,
              borderColor: Colors.secondary.warning + '30',
              marginBottom: Spacing['2xl'],
              alignItems: 'center'
            }}
          >
            <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xs }}>
              Sending Amount
            </Typography>
            <Typography variant="displaySmall" weight="bold" style={{ color: Colors.secondary.warning }}>
              {transaction.amount.toFixed(2)} CELF
            </Typography>
          </Card>

          {/* Transaction Details */}
          <View style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Transaction Details
            </Typography>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">To</Typography>
                <Typography variant="bodyMedium" weight="semibold" numberOfLines={1} style={{ flex: 1, textAlign: 'right' }}>
                  {transaction.recipient}
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Amount</Typography>
                <Typography variant="bodyMedium" weight="semibold">
                  {transaction.amount.toFixed(2)} CELF
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Network Fee</Typography>
                <Typography variant="bodyMedium" weight="semibold">
                  {transaction.fee.toFixed(2)} CELF
                </Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Estimated Time</Typography>
                <Typography variant="bodyMedium" weight="semibold">
                  {transaction.estimatedTime}
                </Typography>
              </View>
              
              {transaction.message && (
                <View>
                  <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
                    Message
                  </Typography>
                  <View style={{
                    backgroundColor: Colors.background.tertiary,
                    padding: Spacing.md,
                    borderRadius: BorderRadius.md,
                  }}>
                    <Typography variant="bodySmall">
                      {transaction.message}
                    </Typography>
                  </View>
                </View>
              )}
              
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: Spacing.md,
                borderTopWidth: 1,
                borderTopColor: Colors.border.primary,
              }}>
                <Typography variant="bodyLarge" weight="bold">Total</Typography>
                <Typography variant="bodyLarge" weight="bold" color="primary">
                  {totalAmount.toFixed(2)} CELF
                </Typography>
              </View>
            </View>
          </View>

          {/* Biometric Authentication */}
          {requiresBiometric && (
            <Card 
              variant="default" 
              style={{ 
                backgroundColor: biometricVerified ? Colors.secondary.success + '10' : Colors.secondary.info + '10',
                borderWidth: 1,
                borderColor: biometricVerified ? Colors.secondary.success + '30' : Colors.secondary.info + '30',
                marginBottom: Spacing['2xl']
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: biometricVerified ? Colors.secondary.success + '20' : Colors.secondary.info + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons 
                    name={biometricVerified ? "checkmark-circle" : "finger-print"} 
                    size={20} 
                    color={biometricVerified ? Colors.secondary.success : Colors.secondary.info} 
                  />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                    {biometricVerified ? 'Authentication Verified' : 'Biometric Authentication Required'}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {biometricVerified 
                      ? 'Your identity has been verified successfully'
                      : 'Use fingerprint or face ID to secure this transaction'
                    }
                  </Typography>
                </View>
                
                {!biometricVerified && (
                  <TouchableOpacity
                    onPress={handleBiometricAuth}
                    style={{
                      backgroundColor: Colors.secondary.info,
                      paddingHorizontal: Spacing.md,
                      paddingVertical: Spacing.sm,
                      borderRadius: BorderRadius.md,
                    }}
                  >
                    <Typography variant="bodySmall" color="inverse" weight="semibold">
                      Verify
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          )}

          {/* Security Notice */}
          <View style={{
            backgroundColor: Colors.secondary.warning + '10',
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing['2xl'],
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="warning" size={20} color={Colors.secondary.warning} style={{ marginRight: Spacing.sm, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Typography variant="bodySmall" style={{ lineHeight: 18 }}>
                  • Double-check the recipient address before confirming
                  {'\n'}• Transactions cannot be reversed once confirmed
                  {'\n'}• Network fees are non-refundable
                  {'\n'}• Keep your device secure during processing
                </Typography>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            <Button
              title={isProcessing ? "Processing Transaction..." : "Confirm & Send"}
              onPress={handleConfirm}
              variant="primary"
              disabled={isProcessing || (requiresBiometric && !biometricVerified)}
              loading={isProcessing}
              icon={!isProcessing ? <Ionicons name="send" size={20} color={Colors.neutral.white} /> : undefined}
              style={{
                shadowColor: Colors.secondary.warning,
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
              disabled={isProcessing}
              icon={<Ionicons name="close" size={20} color={Colors.text.secondary} />}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};
