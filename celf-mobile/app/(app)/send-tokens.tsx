/**
 * Send Tokens Screen - Refactored
 * Reduced from 321 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { useSendTokens } from '@/src/features/send-tokens/hooks/useSendTokens';

export default function SendTokensScreen() {
  const { toggleSidebar } = useNavigation();
  const {
    recipientAddress,
    setRecipientAddress,
    amount,
    setAmount,
    memo,
    setMemo,
    balance,
    balanceBreakdown,
    getFormattedBalance,
    isLoading,
    handleSend,
    scanQR,
    setMaxAmount,
    openExchange,
  } = useSendTokens();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Send Tokens"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Send CELF Tokens
            </Typography>
            
            <View style={{ marginBottom: Spacing.lg }}>
              <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Recipient Address
              </Typography>
              <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
                <TextInput
                  value={recipientAddress}
                  onChangeText={setRecipientAddress}
                  placeholder="Enter wallet address"
                  style={{
                    flex: 1,
                    backgroundColor: Colors.background.primary,
                    borderWidth: 1,
                    borderColor: Colors.border.primary,
                    borderRadius: BorderRadius.md,
                    padding: Spacing.md,
                    fontSize: 16,
                  }}
                />
                <TouchableOpacity
                  onPress={scanQR}
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: Colors.primary.blue,
                    borderRadius: BorderRadius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="qr-code" size={20} color={Colors.neutral.white} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{ marginBottom: Spacing.lg }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
                <Typography variant="bodyMedium" weight="semibold">
                  Amount
                </Typography>
                <TouchableOpacity onPress={setMaxAmount}>
                  <Typography variant="bodySmall" color="primary">
                    Sendable: {getFormattedBalance(balance)}
                  </Typography>
                </TouchableOpacity>
              </View>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                style={{
                  backgroundColor: Colors.background.primary,
                  borderWidth: 1,
                  borderColor: Colors.border.primary,
                  borderRadius: BorderRadius.md,
                  padding: Spacing.md,
                  fontSize: 16,
                }}
              />
            </View>
            
            <View style={{ marginBottom: Spacing.lg }}>
              <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
                Memo (Optional)
              </Typography>
              <TextInput
                value={memo}
                onChangeText={setMemo}
                placeholder="Add a note"
                multiline
                style={{
                  backgroundColor: Colors.background.primary,
                  borderWidth: 1,
                  borderColor: Colors.border.primary,
                  borderRadius: BorderRadius.md,
                  padding: Spacing.md,
                  fontSize: 16,
                  minHeight: 80,
                  textAlignVertical: 'top',
                }}
              />
            </View>
          </Card>

          {/* Balance Info Card */}
          {balanceBreakdown.nonSendable > 0 && (
            <Card variant="default" style={{ marginBottom: Spacing.lg }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
                <Ionicons name="information-circle" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm }} />
                <Typography variant="bodyMedium" weight="semibold">
                  Need more sendable balance?
                </Typography>
              </View>
              <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.md }}>
                You have {getFormattedBalance(balanceBreakdown.nonSendable)} in non-sendable tokens that can be exchanged.
              </Typography>
              <Button
                title="Exchange Tokens"
                onPress={openExchange}
                variant="outline"
                size="small"
                icon={<Ionicons name="swap-horizontal" size={16} color={Colors.primary.blue} />}
              />
            </Card>
          )}

          <Button
            title={isLoading ? "Sending..." : "Send Tokens"}
            onPress={handleSend}
            variant="primary"
            loading={isLoading}
            disabled={!recipientAddress || !amount || isLoading}
            icon={!isLoading ? <Ionicons name="send" size={20} color={Colors.neutral.white} /> : undefined}
          />
        </View>
      </ScrollView>
    </View>
  );
}
