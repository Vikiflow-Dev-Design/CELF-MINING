/**
 * Send Amount Screen - Step 2 of Send Token Flow
 * Shows user details, amount input, and confirmation
 */

import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography, Card } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { router, useLocalSearchParams } from 'expo-router';
import { useWalletStore } from '@/stores/walletStore';
import { useAuthStore } from '@/stores/authStore';
import { SendConfirmationModal } from '@/components/modals/SendConfirmationModal';
import { TransactionResultModal } from '@/components/modals/TransactionResultModal';
import { checkAuthStatus, testTokenSendingFlow } from '@/utils/testHelpers';

export default function SendAmountScreen() {
  const { toggleSidebar } = useNavigation();
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Transaction result modal state
  const [showResultModal, setShowResultModal] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{
    isSuccess: boolean;
    title: string;
    message: string;
    transactionId?: string;
    amount?: string;
    recipientName?: string;
  } | null>(null);

  // Debug state changes
  React.useEffect(() => {
    console.log('🎯 SendAmount: State changed - showResultModal:', showResultModal);
  }, [showResultModal]);

  React.useEffect(() => {
    console.log('🎯 SendAmount: State changed - transactionResult:', transactionResult);
  }, [transactionResult]);

  // Get real wallet data and auth state
  const { balanceBreakdown, getFormattedBalance, sendTokens } = useWalletStore();
  const { isSignedIn, user } = useAuthStore();
  const sendableBalance = balanceBreakdown.sendable;

  const recipient = {
    id: params.userId as string,
    firstName: params.firstName as string,
    lastName: params.lastName as string,
    email: params.email as string,
    walletAddress: params.walletAddress as string,
  };

  // Validate recipient data
  if (!recipient.id || !recipient.firstName || !recipient.lastName || !recipient.email) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background.secondary, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" weight="bold" style={{ marginBottom: Spacing.md }}>
          Invalid Recipient Data
        </Typography>
        <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.xl }}>
          Missing recipient information. Please go back and select a user again.
        </Typography>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="primary"
        />
      </View>
    );
  }

  // Prevent self-transfer
  if (user && recipient.id === user.id) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background.secondary, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" weight="bold" style={{ marginBottom: Spacing.md }}>
          Cannot Send to Yourself
        </Typography>
        <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.xl }}>
          You cannot send tokens to your own account. Please select a different recipient.
        </Typography>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="primary"
        />
      </View>
    );
  }

  const handleConfirm = () => {
    const sendAmount = parseFloat(amount);

    if (!amount || sendAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return;
    }

    if (sendAmount > sendableBalance) {
      Alert.alert(
        'Insufficient Balance',
        `You only have ${getFormattedBalance(sendableBalance)} available to send. Exchange some tokens first to increase your sendable balance.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exchange Tokens', onPress: () => router.push('/(app)/exchange') }
        ]
      );
      return;
    }

    setShowConfirmModal(true);
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    setTransactionResult(null);

    // If transaction was successful, navigate back to previous screen
    if (transactionResult?.isSuccess) {
      router.back();
    }
    // If transaction failed, stay on current screen so user can try again
  };

  const handleViewTransaction = () => {
    setShowResultModal(false);
    setTransactionResult(null);
    // Navigate to wallet/transactions screen
    router.push('/(app)/wallet');
  };

  // Test function to manually show success modal
  const testSuccessModal = () => {
    console.log('🧪 Testing success modal...');
    setTransactionResult({
      isSuccess: true,
      title: 'Test Success!',
      message: 'This is a test success message.',
      transactionId: 'test-123',
      amount: '5.00 CELF',
      recipientName: 'Test User',
    });
    setShowResultModal(true);
  };

  const handleSendTokens = async () => {
    console.log('🎯 SendAmount: handleSendTokens called');
    setIsLoading(true);

    try {
      console.log('🎯 SendAmount: Starting transaction process...');
      // Check authentication first
      if (!isSignedIn || !user) {
        throw new Error('You must be logged in to send tokens. Please login and try again.');
      }

      // Prevent self-transfer (additional safety check)
      if (recipient.id === user.id) {
        throw new Error('Cannot send tokens to yourself. Please select a different recipient.');
      }

      const sendAmount = parseFloat(amount);

      console.log('🚀 SendAmount: Starting token transfer...', {
        sender: user.email,
        recipient: recipient.firstName + ' ' + recipient.lastName,
        amount: sendAmount,
        walletAddress: recipient.walletAddress,
        memo,
        isSignedIn
      });

      if (!recipient.email) {
        throw new Error('Recipient email is missing');
      }

      if (sendAmount <= 0) {
        throw new Error('Invalid amount');
      }

      if (sendAmount > sendableBalance) {
        throw new Error('Insufficient sendable balance');
      }

      // Use real wallet store to send tokens by email
      console.log('📡 SendAmount: Calling wallet store sendTokensByEmail...');
      console.log('📡 SendAmount: Parameters:', {
        recipientEmail: recipient.email,
        amount: sendAmount,
        memo,
        userEmail: user.email
      });

      console.log('🎯 SendAmount: About to call sendTokens...');
      const transaction = await sendTokens(recipient.email, sendAmount, memo);
      console.log('🎯 SendAmount: sendTokens returned, processing response...');
      console.log('✅ SendAmount: Transaction completed successfully:', transaction);
      console.log('✅ SendAmount: Transaction details:', {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        description: transaction.description,
        type: typeof transaction,
        isObject: transaction && typeof transaction === 'object'
      });

      // Close confirmation modal
      console.log('🎯 SendAmount: Closing confirmation modal...');
      setShowConfirmModal(false);

      // Show success result modal
      console.log('🎯 SendAmount: Setting up success modal...');
      const resultData = {
        isSuccess: true,
        title: 'Transaction Successful!',
        message: `Your tokens have been sent successfully to ${recipient.firstName} ${recipient.lastName}.`,
        transactionId: transaction.id,
        amount: getFormattedBalance(sendAmount),
        recipientName: `${recipient.firstName} ${recipient.lastName}`,
      };
      console.log('🎯 SendAmount: Success modal data:', resultData);

      setTransactionResult(resultData);
      console.log('🎯 SendAmount: About to show success modal...');
      setShowResultModal(true);
      console.log('🎯 SendAmount: Success modal should now be visible');

    } catch (error) {
      console.log('🎯 SendAmount: Entered catch block');
      console.error('❌ SendAmount: Send tokens error:', error);
      console.error('❌ SendAmount: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        error
      });

      // Close confirmation modal
      setShowConfirmModal(false);

      // More specific error messages
      let errorMessage = 'Failed to send tokens. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('Authentication')) {
          errorMessage = 'Authentication failed. Please login again and try sending the tokens.';
        } else if (error.message.includes('Insufficient')) {
          errorMessage = 'Insufficient balance. Please exchange some tokens first to increase your sendable balance.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('not found')) {
          errorMessage = 'Recipient not found. Please verify the email address and try again.';
        } else {
          errorMessage = error.message || 'An unexpected error occurred. Please try again.';
        }
      }

      // Show error result modal
      setTransactionResult({
        isSuccess: false,
        title: 'Transaction Failed',
        message: errorMessage,
      });
      setShowResultModal(true);
    } finally {
      console.log('🎯 SendAmount: Entered finally block, setting loading to false');
      setIsLoading(false);
      console.log('🎯 SendAmount: Loading state set to false');
    }
  };

  const setMaxAmount = () => {
    setAmount(sendableBalance.toString());
  };

  // Debug function for testing
  const handleDebugTest = async () => {
    console.log('🧪 Debug: Starting comprehensive test...');
    await checkAuthStatus();
    await testTokenSendingFlow();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Send Tokens"
        leftAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.xl,
          paddingBottom: Spacing.xl,
        }}>
          
          {/* User Details */}
          <View style={{
            backgroundColor: Colors.background.primary,
            borderRadius: 16,
            padding: Spacing.lg,
            marginBottom: Spacing.xl,
            alignItems: 'center',
          }}>
            {/* Avatar */}
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: Colors.primary.blue,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.md,
            }}>
              <Typography variant="h2" color="inverse" weight="bold">
                {recipient.firstName.charAt(0)}{recipient.lastName.charAt(0)}
              </Typography>
            </View>

            {/* Recipient Info */}
            <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.xs }}>
              {recipient.firstName} {recipient.lastName}
            </Typography>
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
              {recipient.email}
            </Typography>
            <Typography variant="bodySmall" color="tertiary" style={{ textAlign: 'center', fontFamily: 'monospace' }}>
              {recipient.walletAddress ?
                `${recipient.walletAddress.slice(0, 16)}...${recipient.walletAddress.slice(-8)}` :
                'No wallet address'
              }
            </Typography>
          </View>

          {/* Amount Input */}
          <View style={{ marginBottom: Spacing.xl }}>
            <Typography variant="h3" weight="bold" style={{ marginBottom: Spacing.md }}>
              Amount to Send
            </Typography>

            {/* Balance Display */}
            <View style={{
              backgroundColor: Colors.background.primary,
              borderRadius: 12,
              padding: Spacing.md,
              marginBottom: Spacing.md,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View>
                <Typography variant="bodySmall" color="secondary">
                  Sendable Balance
                </Typography>
                <Typography variant="bodyLarge" weight="bold" color="primary">
                  {getFormattedBalance(sendableBalance)}
                </Typography>
              </View>
              <TouchableOpacity 
                onPress={setMaxAmount}
                style={{
                  backgroundColor: Colors.primary.blue,
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: 8,
                }}
              >
                <Typography variant="bodySmall" color="inverse" weight="semibold">
                  MAX
                </Typography>
              </TouchableOpacity>
            </View>

            {/* Amount Input */}
            <View style={{
              backgroundColor: Colors.background.primary,
              borderWidth: 1,
              borderColor: amount ? Colors.primary.blue : Colors.border.primary,
              borderRadius: 12,
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.lg,
            }}>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.0000"
                keyboardType="numeric"
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: Colors.text.primary,
                  textAlign: 'center',
                }}
                placeholderTextColor={Colors.text.tertiary}
              />
              <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginTop: Spacing.xs }}>
                CELF
              </Typography>
            </View>
          </View>

          {/* Memo */}
          <View style={{ marginBottom: Spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: Spacing.xs }}>
              <Typography variant="h3" weight="bold">
                Add a Note
              </Typography>
              <Typography variant="bodyMedium" color="secondary"> (Optional)</Typography>
            </View>

            <TextInput
              value={memo}
              onChangeText={setMemo}
              placeholder="Add a personal message..."
              multiline
              style={{
                backgroundColor: Colors.background.primary,
                borderWidth: 1,
                borderColor: Colors.border.primary,
                borderRadius: 12,
                padding: Spacing.md,
                fontSize: 16,
                minHeight: 80,
                textAlignVertical: 'top',
                color: Colors.text.primary,
              }}
              placeholderTextColor={Colors.text.tertiary}
            />
          </View>

          {/* Test Button (for debugging) */}
          <Button
            title="🧪 Test Success Modal"
            onPress={testSuccessModal}
            variant="secondary"
            style={{
              borderRadius: 12,
              paddingVertical: Spacing.md,
              marginBottom: Spacing.md,
            }}
          />

          {/* Confirm Button */}
          <Button
            title="Confirm Transaction"
            onPress={handleConfirm}
            variant="primary"
            disabled={!amount || parseFloat(amount) <= 0}
            icon={<Ionicons name="checkmark" size={20} color={Colors.neutral.white} />}
            style={{
              borderRadius: 12,
              paddingVertical: Spacing.lg,
            }}
          />
        </View>
      </ScrollView>

      {/* Send Confirmation Modal */}
      <SendConfirmationModal
        isVisible={showConfirmModal}
        recipient={recipient}
        amount={amount}
        memo={memo}
        fee={0}
        formattedAmount={getFormattedBalance(parseFloat(amount || '0'))}
        formattedFee="FREE"
        onConfirm={handleSendTokens}
        onCancel={() => setShowConfirmModal(false)}
        isLoading={isLoading}
      />

      {/* Transaction Result Modal */}
      <TransactionResultModal
        isVisible={showResultModal && !!transactionResult}
        isSuccess={transactionResult?.isSuccess || false}
        title={transactionResult?.title || ''}
        message={transactionResult?.message || ''}
        transactionId={transactionResult?.transactionId}
        amount={transactionResult?.amount}
        recipientName={transactionResult?.recipientName}
        onClose={handleResultModalClose}
        onViewTransaction={transactionResult?.isSuccess ? handleViewTransaction : undefined}
      />
    </View>
  );
}
