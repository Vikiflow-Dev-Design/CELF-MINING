import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useMockAuth } from '@/components/MockAuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { SignOutButton } from '@/components/SignOutButton';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user } = useMockAuth();
  const { toggleSidebar } = useNavigation();

  const profileStats = [
    {
      label: 'Total Mined',
      value: '1,247.89 CELF',
      icon: 'diamond',
      color: Colors.secondary.warning,
    },
    { label: 'Referrals', value: '12 Active', icon: 'people', color: Colors.secondary.success },
    { label: 'Member Since', value: 'Jan 2025', icon: 'calendar', color: Colors.primary.blue },
    {
      label: 'Mining Rate',
      value: '0.125/hour',
      icon: 'speedometer',
      color: Colors.secondary.info,
    },
  ];

  const menuItems = [
    { label: 'Account Settings', icon: 'settings-outline', action: () => router.push('/(app)/edit-profile' as any) },
    { label: 'Security', icon: 'shield-outline', action: () => router.push('/(app)/edit-profile' as any) }, // Navigate to edit profile for now
    { label: 'Notifications', icon: 'notifications-outline', action: () => router.push('/(app)/edit-profile' as any) }, // Navigate to edit profile for now
    { label: 'Help & Support', icon: 'help-circle-outline', action: () => router.push('/(app)/help-center' as any) },
    { label: 'Terms & Privacy', icon: 'document-text-outline', action: () => router.push('/(app)/terms-conditions' as any) },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Profile"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity
            onPress={() => router.push('/(app)/edit-profile' as any)}
            style={{
              width: 40,
              height: 40,
              backgroundColor: Colors.background.tertiary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="create-outline" size={20} color={Colors.text.secondary} />
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
          {/* User Info Card */}
          <Card variant="default" style={{ marginBottom: Spacing['3xl'] }}>
            <View style={{ alignItems: 'center' }}>
              {/* Avatar */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Colors.primary.blue + '20',
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: Spacing.lg,
                }}>
                <Typography variant="h1" color="primary" weight="bold">
                  {user?.firstName?.charAt(0) ||
                    user?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase() ||
                    'U'}
                </Typography>
              </View>

              {/* User Details */}
              <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.xs }}>
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.username || 'CELF User'}
              </Typography>
              <Typography
                variant="bodyMedium"
                color="secondary"
                style={{ marginBottom: Spacing.lg }}>
                {user?.emailAddresses[0]?.emailAddress}
              </Typography>

              {/* Verification Badge */}
              <View
                style={{
                  backgroundColor: Colors.secondary.success + '20',
                  borderRadius: 20,
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.xs,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary.success} />
                <Typography
                  variant="caption"
                  color="success"
                  weight="semibold"
                  style={{ marginLeft: Spacing.xs }}>
                  Verified
                </Typography>
              </View>
            </View>
          </Card>

          {/* Stats Grid */}
          <Card variant="default" style={{ marginBottom: Spacing['3xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Your Stats
            </Typography>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: -Spacing.xs,
              }}>
              {profileStats.map((stat, index) => (
                <View
                  key={index}
                  style={{
                    width: '50%',
                    paddingHorizontal: Spacing.xs,
                    marginBottom: Spacing.lg,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.background.tertiary,
                      borderRadius: 12,
                      padding: Spacing.lg,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: Spacing.xs,
                      }}>
                      <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                      <Typography
                        variant="caption"
                        color="secondary"
                        style={{ marginLeft: Spacing.xs }}>
                        {stat.label}
                      </Typography>
                    </View>
                    <Typography variant="bodyMedium" weight="bold">
                      {stat.value}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Menu Items */}
          <Card variant="default" style={{ marginBottom: Spacing['3xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Settings
            </Typography>

            <View>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.action}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: Spacing.lg,
                    borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                    borderBottomColor: Colors.border.secondary,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={item.icon as any} size={20} color={Colors.text.tertiary} />
                    <Typography variant="bodyMedium" style={{ marginLeft: Spacing.md }}>
                      {item.label}
                    </Typography>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Sign Out Button */}
          <SignOutButton />

          {/* App Version */}
          <View style={{ alignItems: 'center', marginTop: Spacing['3xl'] }}>
            <Typography variant="caption" color="tertiary">
              CELF v1.0.0
            </Typography>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
