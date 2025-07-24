import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

export default function ReceiveTokensScreen() {
  const { toggleSidebar } = useNavigation();
  
  // Mock wallet address
  const walletAddress = 'celf1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0';
  const shortAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    Alert.alert('Copied!', 'Wallet address copied to clipboard');
  };

  const shareAddress = async () => {
    try {
      const message = `My CELF wallet address: ${walletAddress}`;

      await Share.share({
        message,
        title: 'CELF Wallet Address',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const generateQRCode = () => {
    // In a real app, this would generate a QR code
    Alert.alert('QR Code', 'QR code generation would be implemented here');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Receive Tokens"
        onMenuPress={toggleSidebar}
        leftAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        }
        rightAction={
          <TouchableOpacity onPress={shareAddress}>
            <Ionicons name="share-outline" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* QR Code Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'], alignItems: 'center' }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Your Wallet QR Code
            </Typography>
            
            {/* QR Code Placeholder */}
            <TouchableOpacity 
              onPress={generateQRCode}
              style={{
                width: 200,
                height: 200,
                backgroundColor: Colors.background.tertiary,
                borderRadius: BorderRadius.lg,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.lg,
                borderWidth: 2,
                borderColor: Colors.border.primary,
              }}
            >
              <Ionicons name="qr-code-outline" size={80} color={Colors.text.tertiary} />
              <Typography variant="bodySmall" color="tertiary" style={{ marginTop: Spacing.sm }}>
                Tap to generate QR code
              </Typography>
            </TouchableOpacity>

            <Typography variant="bodySmall" color="secondary" style={{ textAlign: 'center' }}>
              Share this QR code for others to send you CELF tokens
            </Typography>
          </Card>

          {/* Wallet Address Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Your Wallet Address
            </Typography>
            
            <View style={{
              backgroundColor: Colors.background.tertiary,
              borderRadius: BorderRadius.md,
              padding: Spacing.lg,
              marginBottom: Spacing.lg,
            }}>
              <Typography variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xs }}>
                CELF Address
              </Typography>
              <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.md }}>
                {walletAddress}
              </Typography>
              
              <View style={{ flexDirection: 'row', gap: Spacing.md }}>
                <Button
                  title="Copy"
                  onPress={copyToClipboard}
                  variant="secondary"
                  size="small"
                  icon={<Ionicons name="copy-outline" size={16} color={Colors.primary.blue} />}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Share"
                  onPress={shareAddress}
                  variant="primary"
                  size="small"
                  icon={<Ionicons name="share-outline" size={16} color={Colors.neutral.white} />}
                  style={{ flex: 1 }}
                />
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.secondary.info + '10',
              padding: Spacing.md,
              borderRadius: BorderRadius.md,
            }}>
              <Ionicons name="information-circle" size={20} color={Colors.secondary.info} style={{ marginRight: Spacing.sm }} />
              <Typography variant="bodySmall" color="secondary" style={{ flex: 1 }}>
                Only send CELF tokens to this address. Other cryptocurrencies will be lost.
              </Typography>
            </View>
          </Card>



          
        </View>
      </ScrollView>
    </View>
  );
}
