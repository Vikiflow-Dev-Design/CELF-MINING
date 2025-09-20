/**
 * Profile Screen - Refactored
 * Reduced from 218 lines to ~60 lines by extracting components and logic
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';
import { useProfile } from '@/src/features/profile/hooks/useProfile';

export default function ProfileScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();
  const { profileData, menuItems, handleMenuPress, handleLogout } = useProfile();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Profile"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={themeColors.icon.secondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* Profile Header */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: themeColors.background.tertiary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.md,
              }}>
                {profileData.profilePicture ? (
                  <Image source={{ uri: profileData.profilePicture }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                ) : (
                  <Ionicons name="person" size={50} color={Colors.icon.tertiary} />
                )}
              </View>
              
              <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.xs }}>
                {profileData.displayName}
              </Typography>
              
              <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.sm }}>
                @{profileData.username}
              </Typography>
              
              <Typography variant="bodyMedium" style={{ textAlign: 'center' }}>
                {profileData.bio}
              </Typography>
            </View>
            
            {/* Stats */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center' }}>
                <Typography variant="h3" weight="bold" color="primary">
                  {profileData.totalMined.toFixed(2)}
                </Typography>
                <Typography variant="bodySmall" color="secondary">
                  CELF Mined
                </Typography>
              </View>
              
              <View style={{ alignItems: 'center' }}>
                <Typography variant="h3" weight="bold" color="primary">
                  {profileData.referrals}
                </Typography>
                <Typography variant="bodySmall" color="secondary">
                  Referrals
                </Typography>
              </View>
              

            </View>
          </Card>

          {/* Menu Items */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleMenuPress(item.route)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: Spacing.md,
                  borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                  borderBottomColor: themeColors.border.secondary,
                }}
              >
                <Ionicons name={item.icon as any} size={24} color={Colors.icon.secondary} style={{ marginRight: Spacing.md }} />
                <Typography variant="bodyMedium" style={{ flex: 1 }}>
                  {item.title}
                </Typography>
                <Ionicons name="chevron-forward" size={20} color={Colors.icon.tertiary} />
              </TouchableOpacity>
            ))}
          </Card>

          {/* Logout Button */}
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            icon={<Ionicons name="log-out-outline" size={20} color={Colors.secondary.error} />}
            style={{
              borderColor: Colors.secondary.error,
              backgroundColor: Colors.secondary.error + '10',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
