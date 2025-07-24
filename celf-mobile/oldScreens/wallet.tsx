import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';

export default function WalletScreen() {
  const { toggleSidebar } = useNavigation();

  const handleQRScan = () => {
    // Navigate to QR scanner or show QR scanner modal
    console.log('QR Scanner pressed');
    // For now, navigate to receive tokens screen
    router.push('/(app)/receive-tokens' as any);
  };
  const balance = 1247.89;

  const transactions = [
    {
      id: 1,
      type: 'mining',
      amount: 12.5,
      date: '2025-01-11',
      status: 'completed',
      description: 'Mining Reward',
    },
    {
      id: 2,
      type: 'referral',
      amount: 5.0,
      date: '2025-01-10',
      status: 'completed',
      description: 'Referral Bonus',
    },
    {
      id: 3,
      type: 'send',
      amount: -25.0,
      date: '2025-01-09',
      status: 'completed',
      description: 'Sent to User',
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'mining':
        return 'diamond';
      case 'referral':
        return 'people';
      case 'send':
        return 'arrow-up';
      case 'receive':
        return 'arrow-down';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'mining':
        return Colors.secondary.warning;
      case 'referral':
        return Colors.secondary.success;
      case 'send':
        return Colors.secondary.error;
      case 'receive':
        return Colors.secondary.success;
      default:
        return Colors.primary.blue;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Wallet"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity
            onPress={handleQRScan}
            style={{
              width: 40,
              height: 40,
              backgroundColor: Colors.background.tertiary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="scan-outline" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingTop: Spacing['2xl'],
            paddingBottom: 32,
          }}>
          {/* Balance Cards */}
          <View style={{ gap: Spacing.lg, marginBottom: Spacing['3xl'] }}>
            {/* Main Balance */}
            <Card
              variant="gradient"
              gradientColors={[Colors.primary.blue, Colors.primary.light]}
              style={{
                backgroundColor: Colors.primary.blue,
                shadowColor: Colors.primary.blue,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: Spacing.lg,
                }}>
                <View>
                  <Typography
                    variant="bodySmall"
                    color="inverse"
                    style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                    Available Balance
                  </Typography>
                  <Typography variant="displaySmall" color="inverse" weight="bold">
                    {balance.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="bodyLarge"
                    color="inverse"
                    weight="semibold"
                    style={{ opacity: 0.9 }}>
                    CELF
                  </Typography>
                </View>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons name="wallet" size={24} color={Colors.neutral.white} />
                </View>
              </View>


            </Card>


          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing['3xl'] }}>
            <Button
              title="Send"
              onPress={() => router.push('/(app)/send-tokens' as any)}
              variant="primary"
              icon={<Ionicons name="arrow-up" size={20} color={Colors.neutral.white} />}
              style={{ flex: 1 }}
            />

            <Button
              title="Receive"
              onPress={() => router.push('/(app)/receive-tokens' as any)}
              variant="success"
              icon={<Ionicons name="arrow-down" size={20} color={Colors.neutral.white} />}
              style={{ flex: 1 }}
            />

           
          </View>

          {/* Recent Transactions */}
          <Card variant="default">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: Spacing.lg,
              }}>
              <Typography variant="h3" weight="semibold">
                Recent Transactions
              </Typography>
              <TouchableOpacity onPress={() => router.push('/(app)/transaction-history' as any)}>
                <Typography variant="bodyMedium" color="primary" weight="semibold">
                  View All
                </Typography>
              </TouchableOpacity>
            </View>

            <View style={{ gap: Spacing.lg }}>
              {transactions.map((transaction) => (
                <View
                  key={transaction.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: getTransactionColor(transaction.type) + '20',
                        marginRight: Spacing.md,
                      }}>
                      <Ionicons
                        name={getTransactionIcon(transaction.type) as any}
                        size={20}
                        color={getTransactionColor(transaction.type)}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Typography variant="bodyMedium" weight="semibold">
                        {transaction.description}
                      </Typography>
                      <Typography variant="caption" color="tertiary">
                        {transaction.date}
                      </Typography>
                    </View>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Typography
                      variant="bodyMedium"
                      weight="semibold"
                      color={transaction.amount > 0 ? 'success' : 'error'}>
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount} CELF
                    </Typography>
                    <Typography
                      variant="caption"
                      color="tertiary"
                      style={{ textTransform: 'capitalize' }}>
                      {transaction.status}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
