/**
 * Referrals Screen - Refactored
 * Reduced from 306 lines to ~60 lines by extracting components and logic
 */

import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';
import { useReferrals } from '@/src/features/referrals/hooks/useReferrals';

export default function ReferralsScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  const {
    referralCode,
    referralLink,
    stats,
    isLoading,
    error,
    shareReferralLink,
    copyReferralCode,
    copyReferralLink,
    refreshReferralData,
  } = useReferrals();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshReferralData();
    setRefreshing(false);
  }, [refreshReferralData]);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Referrals"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeColors.primary.blue}
            colors={[themeColors.primary.blue]}
          />
        }
      >
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>

          {/* Error State */}
          {error && (
            <Card variant="default" style={{ marginBottom: Spacing['2xl'], backgroundColor: '#fee2e2' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="warning" size={24} color="#dc2626" style={{ marginRight: Spacing.md }} />
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" color="primary" weight="semibold">
                    Error Loading Referral Data
                  </Typography>
                  <Typography variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>
                    {error}
                  </Typography>
                </View>
              </View>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && !error && (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: Spacing['3xl']
            }}>
              <ActivityIndicator size="large" color={themeColors.primary.blue} />
              <Typography variant="bodyMedium" color="secondary" style={{ marginTop: Spacing.md }}>
                Loading referral data...
              </Typography>
            </View>
          )}

          {/* Content - only show when not loading and no error */}
          {!isLoading && !error && (
            <>
              {/* Stats Card */}
          <Card variant="gradient" gradientColors={[Colors.primary.blue, Colors.primary.light]} style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" color="inverse" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Referral Stats
            </Typography>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {stats.totalReferrals}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  Total Referrals
                </Typography>
              </View>
              
              <View style={{ alignItems: 'center' }}>
                <Typography variant="displaySmall" color="inverse" weight="bold">
                  {stats.totalEarnings}
                </Typography>
                <Typography variant="bodySmall" color="inverse" style={{ opacity: 0.8 }}>
                  CELF Earned
                </Typography>
              </View>
            </View>
          </Card>

          {/* Referral Code Card */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Your Referral Code
            </Typography>
            
            <View style={{
              backgroundColor: themeColors.background.tertiary,
              padding: Spacing.md,
              borderRadius: BorderRadius.md,
              marginBottom: Spacing.lg,
            }}>
              <Typography variant="h2" weight="bold" style={{ textAlign: 'center' }}>
                {referralCode}
              </Typography>
            </View>
            
            <View style={{ gap: Spacing.md }}>
              <Button
                title="Share Referral Link"
                onPress={shareReferralLink}
                variant="primary"
                icon={<Ionicons name="share-social" size={20} color={themeColors.icon.inverse} />}
              />
              
              <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
                <Button
                  title="Copy Code"
                  onPress={copyReferralCode}
                  variant="secondary"
                  style={{ flex: 1 }}
                  icon={<Ionicons name="copy" size={20} color={themeColors.primary.blue} />}
                />
                
                <Button
                  title="Copy Link"
                  onPress={copyReferralLink}
                  variant="secondary"
                  style={{ flex: 1 }}
                  icon={<Ionicons name="link" size={20} color={themeColors.primary.blue} />}
                />
              </View>
            </View>
          </Card>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
