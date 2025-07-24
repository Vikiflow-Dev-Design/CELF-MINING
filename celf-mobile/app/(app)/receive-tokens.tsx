/**
 * Receive Tokens Screen - Refactored
 * Reduced from 157 lines to ~50 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { useReceiveTokens } from '@/src/features/receive-tokens/hooks/useReceiveTokens';

export default function ReceiveTokensScreen() {
  const { toggleSidebar } = useNavigation();
  const { walletAddress, copyAddress, shareAddress } = useReceiveTokens();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Receive Tokens"
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
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg, textAlign: 'center' }}>
              Receive CELF Tokens
            </Typography>
            
            {/* QR Code Placeholder */}
            <View style={{
              width: 200,
              height: 200,
              backgroundColor: Colors.background.tertiary,
              borderRadius: BorderRadius.md,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons name="qr-code" size={100} color={Colors.text.tertiary} />
            </View>
            
            <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.lg }}>
              Scan this QR code or share your wallet address to receive CELF tokens
            </Typography>
            
            {/* Wallet Address */}
            <View style={{
              backgroundColor: Colors.background.tertiary,
              padding: Spacing.md,
              borderRadius: BorderRadius.md,
              marginBottom: Spacing.lg,
            }}>
              <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xs }}>
                Your Wallet Address:
              </Typography>
              <Typography variant="bodyMedium" weight="medium" style={{ wordBreak: 'break-all' }}>
                {walletAddress}
              </Typography>
            </View>
            
            {/* Action Buttons */}
            <View style={{ gap: Spacing.md }}>
              <Button
                title="Copy Address"
                onPress={copyAddress}
                variant="primary"
                icon={<Ionicons name="copy" size={20} color={Colors.neutral.white} />}
              />
              
              <Button
                title="Share Address"
                onPress={shareAddress}
                variant="secondary"
                icon={<Ionicons name="share-social" size={20} color={Colors.primary.blue} />}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
