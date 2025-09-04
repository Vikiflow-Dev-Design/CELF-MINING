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
import { checkAuthStatus, testTokenSendingFlow } from '@/utils/testHelpers';

export default function SendAmountScreen() {
  const { toggleSidebar } = useNavigation();
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendTokens = async () => {
    setIsLoading(true);
    try {
      // Check authentication first
      if (!isSignedIn || !user) {
        throw new Error('You must be logged in to send tokens. Please login and try again.');
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
      const transaction = await sendTokens(recipient.email, sendAmount, memo);
      console.log('✅ SendAmount: Transaction completed:', transaction);

      // Close modal and navigate back with success
      setShowConfirmModal(false);

      Alert.alert(
        'Transaction Successful!',
        `${getFormattedBalance(sendAmount)} has been sent to ${recipient.firstName} ${recipient.lastName}!\n\nTransaction ID: ${transaction.id}`,
        [{ text: 'OK', onPress: () => router.back() }]
      );

    } catch (error) {
      console.error('❌ SendAmount: Send tokens error:', error);

      // More specific error messages
      let errorMessage = 'Failed to send tokens';
      if (error instanceof Error) {
        if (error.message.includes('Authentication')) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (error.message.includes('Insufficient')) {
          errorMessage = 'Insufficient balance. Please exchange some tokens first.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }

      Alert.alert('Transaction Failed', errorMessage);
    } finally {
      setIsLoading(false);
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
            <Typography variant="h3" weight="bold" style={{ marginBottom: Spacing.xs }}>
              Add a Note
              <Typography variant="bodyMedium" color="secondary"> (Optional)</Typography>
            </Typography>

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
    </View>
  );
}
