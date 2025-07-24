import React from 'react';
import { View, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { EmptyReferrals } from '@/components/empty-states';

export default function ReferralsScreen() {
  const { toggleSidebar } = useNavigation();
  const referralCode = 'CELF2025';

  // Change these values to simulate empty state (set to 0 and empty array)
  const totalReferrals = 0; // Change to 12 to see populated state
  const totalEarnings = 0; // Change to 156.75 to see populated state

  const referralHistory = [
    // Uncomment these to see populated state:
    // { id: 1, name: 'John D.', date: '2025-01-10', earnings: 25.0, status: 'active' },
    // { id: 2, name: 'Sarah M.', date: '2025-01-08', earnings: 25.0, status: 'active' },
    // { id: 3, name: 'Mike R.', date: '2025-01-05', earnings: 25.0, status: 'pending' },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on CELF and start mining cryptocurrency! Use my referral code: ${referralCode}`,
        url: `https://celf.app/invite/${referralCode}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyCode = () => {
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const steps = [
    {
      number: 1,
      title: 'Share Your Code',
      description: 'Send your referral code to friends and family',
    },
    {
      number: 2,
      title: 'They Join & Mine',
      description: 'When they sign up and start mining, you both earn bonuses',
    },
    {
      number: 3,
      title: 'Earn Together',
      description: 'Get 25 CELF for each successful referral + ongoing bonuses',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Referrals"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: Colors.background.tertiary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="gift-outline" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        }
      />

      {totalReferrals === 0 ? (
        <EmptyReferrals
          referralCode={referralCode}
          onShareReferral={handleShare}
        />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: Layout.screenMargin.mobile,
              paddingTop: Spacing['2xl'],
              paddingBottom: 32,
            }}>
          {/* Earnings Summary */}
          <Card
            variant="gradient"
            gradientColors={[Colors.secondary.success, '#34D399']}
            style={{
              backgroundColor: Colors.secondary.success,
              marginBottom: Spacing['3xl'],
              shadowColor: Colors.secondary.success,
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
              }}>
              <View>
                <Typography
                  variant="bodySmall"
                  color="inverse"
                  style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                  Total Referral Earnings
                </Typography>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {totalEarnings.toFixed(2)}
                </Typography>
                <Typography
                  variant="bodyLarge"
                  color="inverse"
                  weight="semibold"
                  style={{ opacity: 0.9 }}>
                  CELF
                </Typography>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Typography
                  variant="bodySmall"
                  color="inverse"
                  style={{ opacity: 0.8, marginBottom: Spacing.xs }}>
                  Active Referrals
                </Typography>
                <Typography variant="h1" color="inverse" weight="bold">
                  {totalReferrals}
                </Typography>
              </View>
            </View>
          </Card>

          {/* Referral Code */}
          <Card variant="default" style={{ marginBottom: Spacing['3xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Your Referral Code
            </Typography>

            <View
              style={{
                backgroundColor: Colors.background.tertiary,
                borderRadius: 12,
                padding: Spacing.lg,
                marginBottom: Spacing.lg,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Typography variant="h2" color="primary" weight="bold" style={{ letterSpacing: 2 }}>
                  {referralCode}
                </Typography>
                <Button
                  title="Copy"
                  onPress={handleCopyCode}
                  size="small"
                  style={{ paddingHorizontal: Spacing.lg }}
                />
              </View>
            </View>

            <Button
              title="Share Invite Link"
              onPress={handleShare}
              icon={<Ionicons name="share-outline" size={20} color={Colors.neutral.white} />}
            />
          </Card>

          {/* How It Works */}
          <Card variant="default" style={{ marginBottom: Spacing['3xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              How Referrals Work
            </Typography>

            <View style={{ gap: Spacing.lg }}>
              {steps.map((step) => (
                <View key={step.number} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: Colors.primary.blue + '20',
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: Spacing.md,
                      marginTop: 2,
                    }}>
                    <Typography variant="bodySmall" color="primary" weight="bold">
                      {step.number}
                    </Typography>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Typography
                      variant="bodyMedium"
                      weight="semibold"
                      style={{ marginBottom: Spacing.xs }}>
                      {step.title}
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      {step.description}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Referral History */}
          <Card variant="default">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: Spacing.lg,
              }}>
              <Typography variant="h3" weight="semibold">
                Recent Referrals
              </Typography>
              <TouchableOpacity>
                <Typography variant="bodyMedium" color="primary" weight="semibold">
                  View All
                </Typography>
              </TouchableOpacity>
            </View>

            <View style={{ gap: Spacing.lg }}>
              {referralHistory.map((referral) => (
                <View
                  key={referral.id}
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
                        backgroundColor: Colors.primary.blue + '20',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: Spacing.md,
                      }}>
                      <Ionicons name="person" size={20} color={Colors.primary.blue} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Typography variant="bodyMedium" weight="semibold">
                        {referral.name}
                      </Typography>
                      <Typography variant="caption" color="tertiary">
                        {referral.date}
                      </Typography>
                    </View>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Typography variant="bodyMedium" weight="semibold" color="success">
                      +{referral.earnings} CELF
                    </Typography>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor:
                            referral.status === 'active'
                              ? Colors.secondary.success
                              : Colors.secondary.warning,
                          marginRight: Spacing.xs,
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="tertiary"
                        style={{ textTransform: 'capitalize' }}>
                        {referral.status}
                      </Typography>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
      )}
    </View>
  );
}
