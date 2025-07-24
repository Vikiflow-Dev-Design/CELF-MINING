import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router, useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

interface TransactionDetail {
  id: string;
  type: 'mining' | 'referral' | 'send' | 'receive';
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  recipient?: string;
  sender?: string;
  txHash: string;
  blockNumber?: number;
  confirmations?: number;
  fee?: number;
  message?: string;
}

export default function TransactionDetailsScreen() {
  const { toggleSidebar } = useNavigation();
  const { id } = useLocalSearchParams();
  
  // Mock transaction data - in real app, fetch by ID
  const transaction: TransactionDetail = {
    id: id as string || '1',
    type: 'send',
    amount: -25.0,
    date: '2025-01-15',
    time: '16:45',
    status: 'completed',
    description: 'Sent to @sarahw',
    recipient: '@sarahw',
    txHash: '0x3456789abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    blockNumber: 1234567,
    confirmations: 12,
    fee: 0.01,
    message: 'Payment for lunch yesterday 🍕'
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'mining': return 'diamond';
      case 'referral': return 'people';
      case 'send': return 'arrow-up';
      case 'receive': return 'arrow-down';
      default: return 'swap-horizontal';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'mining': return Colors.secondary.warning;
      case 'referral': return Colors.secondary.success;
      case 'send': return Colors.secondary.error;
      case 'receive': return Colors.secondary.success;
      default: return Colors.primary.blue;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return Colors.secondary.success;
      case 'pending': return Colors.secondary.warning;
      case 'failed': return Colors.secondary.error;
      default: return Colors.text.tertiary;
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', `${label} copied to clipboard`);
  };

  const shareTransaction = async () => {
    try {
      const message = `CELF Transaction Details\n\nAmount: ${transaction.amount > 0 ? '+' : ''}${transaction.amount} CELF\nDate: ${transaction.date} ${transaction.time}\nStatus: ${transaction.status}\nTx Hash: ${transaction.txHash}`;
      
      await Share.share({
        message,
        title: 'CELF Transaction Receipt',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openBlockExplorer = () => {
    Alert.alert('Block Explorer', 'This would open the transaction in a block explorer');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Transaction Details"
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
          
          {/* Transaction Status Card */}
          <Card 
            variant="gradient" 
            gradientColors={[getTransactionColor(transaction.type), getTransactionColor(transaction.type) + 'CC']}
            style={{ 
              backgroundColor: getTransactionColor(transaction.type),
              shadowColor: getTransactionColor(transaction.type),
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
              marginBottom: Spacing['2xl'],
              alignItems: 'center'
            }}
          >
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.lg,
            }}>
              <Ionicons 
                name={getTransactionIcon(transaction.type) as any} 
                size={30} 
                color={Colors.neutral.white} 
              />
            </View>
            
            <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Transaction
            </Typography>
            
            <Typography variant="displaySmall" color="inverse" weight="bold">
              {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount).toFixed(2)}
            </Typography>
            
            <Typography variant="bodyLarge" color="inverse" weight="semibold" style={{ opacity: 0.9 }}>
              CELF
            </Typography>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginTop: Spacing.md,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
            }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: Colors.neutral.white,
                marginRight: Spacing.sm,
              }} />
              <Typography variant="bodySmall" color="inverse" weight="semibold">
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Typography>
            </View>
          </Card>

          {/* Transaction Details */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.primary.blue + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="information-circle" size={20} color={Colors.primary.blue} />
              </View>
              <Typography variant="h3" weight="semibold">
                Transaction Information
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Description</Typography>
                <Typography variant="bodyMedium" weight="semibold">{transaction.description}</Typography>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="bodyMedium" color="secondary">Date & Time</Typography>
                <Typography variant="bodyMedium" weight="semibold">{transaction.date} {transaction.time}</Typography>
              </View>
              
              {transaction.recipient && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Recipient</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{transaction.recipient}</Typography>
                </View>
              )}
              
              {transaction.sender && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Sender</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{transaction.sender}</Typography>
                </View>
              )}
              
              {transaction.fee && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Network Fee</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{transaction.fee} CELF</Typography>
                </View>
              )}
              
              {transaction.confirmations && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Confirmations</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{transaction.confirmations}</Typography>
                </View>
              )}
            </View>
          </Card>

          {/* Message */}
          {transaction.message && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.secondary.info + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name="chatbubble-outline" size={20} color={Colors.secondary.info} />
                </View>
                <Typography variant="h3" weight="semibold">
                  Message
                </Typography>
              </View>
              <Typography variant="bodyMedium" style={{ lineHeight: 22 }}>
                {transaction.message}
              </Typography>
            </Card>
          )}

          {/* Technical Details */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.neutral[500] + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}>
                <Ionicons name="code-outline" size={20} color={Colors.neutral[500]} />
              </View>
              <Typography variant="h3" weight="semibold">
                Technical Details
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <View>
                <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.xs }}>
                  Transaction Hash
                </Typography>
                <TouchableOpacity 
                  onPress={() => copyToClipboard(transaction.txHash, 'Transaction hash')}
                  style={{
                    backgroundColor: Colors.background.tertiary,
                    padding: Spacing.md,
                    borderRadius: BorderRadius.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="bodySmall" style={{ flex: 1, fontFamily: 'monospace' }}>
                    {transaction.txHash}
                  </Typography>
                  <Ionicons name="copy-outline" size={16} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>
              
              {transaction.blockNumber && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="bodyMedium" color="secondary">Block Number</Typography>
                  <Typography variant="bodyMedium" weight="semibold">{transaction.blockNumber}</Typography>
                </View>
              )}
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: Spacing.md }}>
            <Button
              title="View on Block Explorer"
              onPress={openBlockExplorer}
              variant="secondary"
              icon={<Ionicons name="open-outline" size={20} color={Colors.primary.blue} />}
            />
            
            <Button
              title="Share Receipt"
              onPress={shareTransaction}
              variant="primary"
              icon={<Ionicons name="share-outline" size={20} color={Colors.neutral.white} />}
              style={{
                shadowColor: Colors.primary.blue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
