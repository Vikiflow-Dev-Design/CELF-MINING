/**
 * Settings Screen
 * Provides app configuration options including theme switching
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  route?: string;
}

export default function SettingsScreen() {
  const { toggleSidebar } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const themeColors = useThemeColors();

  const settingsItems: SettingItem[] = [
    {
      id: 'theme',
      title: 'Dark Theme',
      description: 'Switch between light and dark appearance',
      icon: theme === 'dark' ? 'moon' : 'sunny',
      type: 'toggle',
      value: theme === 'dark',
      onToggle: () => toggleTheme(),
    },
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Receive mining and transaction updates',
      icon: 'notifications',
      type: 'toggle',
      value: true, // TODO: Connect to notification settings
      onToggle: (value) => console.log('Notifications:', value),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'View our privacy policy',
      icon: 'shield-checkmark',
      type: 'navigation',
      route: '/privacy-policy',
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'View terms and conditions',
      icon: 'document-text',
      type: 'navigation',
      route: '/terms-conditions',
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      type: 'navigation',
      route: '/help-center',
    },
    {
      id: 'about',
      title: 'About CELF',
      description: 'Learn about our mission and vision',
      icon: 'information-circle',
      type: 'navigation',
      route: '/about',
    },
    {
      id: 'app-info',
      title: 'App Information',
      description: 'Technical details and version info',
      icon: 'phone-portrait',
      type: 'navigation',
      route: '/app-information',
    },
  ];

  const handleItemPress = (item: SettingItem) => {
    if (item.type === 'navigation' && item.route) {
      router.push(item.route as any);
    } else if (item.type === 'action' && item.onPress) {
      item.onPress();
    }
  };

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      disabled={item.type === 'toggle'}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.border.secondary,
      }}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: themeColors.background.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
      }}>
        <Ionicons 
          name={item.icon as any} 
          size={20} 
          color={themeColors.icon.secondary} 
        />
      </View>

      <View style={{ flex: 1 }}>
        <Typography variant="bodyMedium" weight="medium">
          {item.title}
        </Typography>
        {item.description && (
          <Typography variant="caption" color="secondary" style={{ marginTop: 2 }}>
            {item.description}
          </Typography>
        )}
      </View>

      {item.type === 'toggle' && item.onToggle && (
        <Switch
          value={item.value || false}
          onValueChange={item.onToggle}
          trackColor={{ 
            false: themeColors.background.tertiary, 
            true: themeColors.primary.blue + '40' 
          }}
          thumbColor={item.value ? themeColors.primary.blue : themeColors.icon.tertiary}
        />
      )}

      {item.type === 'navigation' && (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={themeColors.icon.tertiary} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="Settings"
        onMenuPress={toggleSidebar}
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* Settings Card */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ 
              marginBottom: Spacing.lg,
              paddingHorizontal: Spacing.md,
              paddingTop: Spacing.md,
            }}>
              Preferences
            </Typography>

            {settingsItems.map(renderSettingItem)}
          </Card>

          {/* App Version */}
          <Card variant="default">
            <View style={{ alignItems: 'center', paddingVertical: Spacing.lg }}>
              <Typography variant="bodyMedium" color="secondary">
                CELF Mining App
              </Typography>
              <Typography variant="caption" color="tertiary" style={{ marginTop: 4 }}>
                Version 1.0.0
              </Typography>
            </View>
          </Card>

        </View>
      </ScrollView>
    </View>
  );
}
