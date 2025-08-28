/**
 * Send Amount Screen - Step 2 of Send Token Flow
 * Shows user details, amount input, and confirmation
 */

import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing } from '@/constants/design-tokens';
import { router, useLocalSearchParams } from 'expo-router';

export default function SendAmountScreen() {
  const { toggleSidebar } = useNavigation();
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock balance data - replace with actual API call
  const balance = 1000.5678;
  const getFormattedBalance = (value: number) => `${value.toFixed(4)} CELF`;

  const user = {
    id: params.userId as string,
    firstName: params.firstName as string,
    lastName: params.lastName as string,
    email: params.email as string,
    walletAddress: params.walletAddress as string,
  };

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setShowConfirmModal(true);
  };

  const handleSendTokens = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close modal and navigate back with success
      setShowConfirmModal(false);
      router.back();
      // You could also show a success screen or toast here
    } catch (error) {
      console.error('Send tokens error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setMaxAmount = () => {
    setAmount(balance.toString());
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
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </Typography>
            </View>
            
            {/* User Info */}
            <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.xs }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
              {user.email}
            </Typography>
            <Typography variant="bodySmall" color="tertiary" style={{ textAlign: 'center' }}>
              {user.walletAddress.slice(0, 16)}...{user.walletAddress.slice(-8)}
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
                  Available Balance
                </Typography>
                <Typography variant="bodyLarge" weight="bold" color="primary">
                  {getFormattedBalance(balance)}
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

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
          <Header
            title="Confirm Transaction"
            rightAction={
              <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text.secondary} />
              </TouchableOpacity>
            }
          />
          
          <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg }}>
            {/* Transaction Details */}
            <View style={{
              backgroundColor: Colors.background.primary,
              borderRadius: 16,
              padding: Spacing.lg,
              marginBottom: Spacing.xl,
            }}>
              <Typography variant="h3" weight="bold" style={{ marginBottom: Spacing.md }}>
                Transaction Details
              </Typography>
              
              <View style={{ marginBottom: Spacing.md }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <Typography variant="bodyMedium" color="secondary">To:</Typography>
                  <Typography variant="bodyMedium" weight="semibold">
                    {user.firstName} {user.lastName}
                  </Typography>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <Typography variant="bodyMedium" color="secondary">Amount:</Typography>
                  <Typography variant="bodyLarge" weight="bold" color="primary">
                    {amount} CELF
                  </Typography>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <Typography variant="bodyMedium" color="secondary">Fee:</Typography>
                  <Typography variant="bodyMedium" weight="semibold" color="success">
                    FREE
                  </Typography>
                </View>
                {memo && (
                  <View style={{ marginTop: Spacing.sm }}>
                    <Typography variant="bodySmall" color="secondary">Note:</Typography>
                    <Typography variant="bodyMedium" style={{ marginTop: Spacing.xs }}>
                      "{memo}"
                    </Typography>
                  </View>
                )}
              </View>
            </View>

            {/* Confirm Button */}
            <Button
              title={isLoading ? "Sending..." : "Send Tokens"}
              onPress={handleSendTokens}
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
              icon={!isLoading ? <Ionicons name="send" size={20} color={Colors.neutral.white} /> : undefined}
              style={{
                borderRadius: 12,
                paddingVertical: Spacing.lg,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
