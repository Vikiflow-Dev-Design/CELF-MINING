/**
 * Show More Modal Component
 * Full-screen modal displaying all project links and app activities
 */

import React from 'react';
import { View, Modal, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';
import { projectActivities } from '@/src/features/mining/data';

export interface ShowMoreModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ShowMoreModal: React.FC<ShowMoreModalProps> = ({
  isVisible,
  onClose,
}) => {
  const themeColors = useThemeColors();

  const handleItemPress = async (item: any) => {
    try {
      if (item.url) {
        // External link
        await Linking.openURL(item.url);
      } else if (item.route) {
        // Internal route
        onClose(); // Close modal first
        setTimeout(() => {
          router.push(item.route);
        }, 100);
      }
    } catch (error) {
      console.error('Failed to open link:', error);
    }
  };

  const renderCategory = (category: any) => (
    <View key={category.category} style={{ marginBottom: Spacing.xl }}>
      <Typography 
        variant="h3" 
        weight="bold" 
        style={{ 
          marginBottom: Spacing.lg,
          color: themeColors.text.primary,
        }}
      >
        {category.category}
      </Typography>
      
      <View style={{ gap: Spacing.sm }}>
        {category.items.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleItemPress(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: themeColors.background.tertiary,
              borderRadius: 16,
              padding: Spacing.lg,
              borderWidth: 1,
              borderColor: themeColors.border.primary,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: item.color + '15',
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Spacing.md,
              }}
            >
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={item.color} 
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Typography 
                variant="bodyLarge" 
                weight="semibold" 
                style={{ 
                  marginBottom: 2,
                  color: themeColors.text.primary,
                }}
              >
                {item.title}
              </Typography>
              <Typography 
                variant="bodyMedium" 
                color="secondary"
                style={{ lineHeight: 18 }}
              >
                {item.description}
              </Typography>
            </View>
            
            <Ionicons 
              name={item.url ? "open-outline" : "chevron-forward"} 
              size={20} 
              color={themeColors.icon.tertiary} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={{ 
        flex: 1, 
        backgroundColor: themeColors.background.primary 
      }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingTop: 60, // Account for status bar
            paddingBottom: Spacing.lg,
            backgroundColor: themeColors.background.secondary,
            borderBottomWidth: 1,
            borderBottomColor: themeColors.border.primary,
          }}
        >
          <Typography variant="h2" weight="bold">
            All Activities
          </Typography>
          
          <TouchableOpacity
            onPress={onClose}
            style={{
              width: 40,
              height: 40,
              backgroundColor: themeColors.background.tertiary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons 
              name="close" 
              size={24} 
              color={themeColors.icon.primary} 
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: Layout.screenMargin.mobile,
            paddingVertical: Spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Typography 
            variant="bodyLarge" 
            color="secondary"
            style={{ 
              marginBottom: Spacing.xl,
              textAlign: 'center',
              lineHeight: 24,
            }}
          >
            Explore all the features and activities available in the CELF Mining app
          </Typography>

          {projectActivities.map(renderCategory)}
          
          {/* Footer */}
          <View
            style={{
              alignItems: 'center',
              paddingVertical: Spacing.xl,
              marginTop: Spacing.lg,
            }}
          >
            <Typography 
              variant="bodyMedium" 
              color="tertiary"
              style={{ textAlign: 'center' }}
            >
              CELF Mining App v1.0.0
            </Typography>
            <Typography 
              variant="caption" 
              color="tertiary"
              style={{ 
                textAlign: 'center',
                marginTop: Spacing.xs,
              }}
            >
              Your gateway to decentralized mining
            </Typography>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
