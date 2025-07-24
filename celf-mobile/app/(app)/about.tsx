/**
 * About CELF Screen
 * Explains what CELF is about, mission, and vision
 */

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Colors, Spacing, Layout } from '@/constants/design-tokens';
import { router } from 'expo-router';

export default function AboutScreen() {
  const { toggleSidebar } = useNavigation();
  const themeColors = useThemeColors();

  const features = [
    {
      icon: 'flash',
      title: 'Mining Rewards',
      description: 'Earn CELF tokens through our innovative mobile mining system',
    },
    {
      icon: 'people',
      title: 'Community Driven',
      description: 'Built by the community, for the community with transparent governance',
    },
    {
      icon: 'shield-checkmark',
      title: 'Secure & Safe',
      description: 'Advanced security measures to protect your digital assets',
    },
    {
      icon: 'globe',
      title: 'Global Access',
      description: 'Accessible worldwide with support for multiple languages',
    },
  ];

  const stats = [
    { label: 'Active Miners', value: '50K+' },
    { label: 'Countries', value: '120+' },
    { label: 'Tokens Mined', value: '1M+' },
    { label: 'Community Members', value: '100K+' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background.secondary }}>
      <Header
        title="About CELF"
        onMenuPress={toggleSidebar}
        rightAction={
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: themeColors.background.tertiary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="close" size={20} color={themeColors.icon.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* Hero Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ alignItems: 'center', paddingVertical: Spacing['2xl'] }}>
              {/* CELF Logo/Icon */}
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: Colors.primary.blue,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.lg,
              }}>
                <Typography variant="h1" style={{ color: 'white', fontSize: 32 }}>
                  C
                </Typography>
              </View>

              <Typography variant="h2" weight="bold" style={{ 
                textAlign: 'center',
                marginBottom: Spacing.md,
              }}>
                CELF Mining
              </Typography>

              <Typography variant="bodyLarge" color="secondary" style={{ 
                textAlign: 'center',
                lineHeight: 24,
              }}>
                The future of decentralized mobile mining. Earn cryptocurrency rewards 
                while contributing to a global network of miners.
              </Typography>
            </View>
          </Card>

          {/* Mission Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ padding: Spacing.lg }}>
              <Typography variant="h3" weight="semibold" style={{ 
                marginBottom: Spacing.md,
                color: Colors.primary.blue,
              }}>
                Our Mission
              </Typography>
              
              <Typography variant="bodyMedium" style={{ 
                lineHeight: 22,
                marginBottom: Spacing.md,
              }}>
                To democratize cryptocurrency mining by making it accessible to everyone 
                through mobile devices, creating a sustainable and inclusive digital economy.
              </Typography>

              <Typography variant="bodyMedium" style={{ 
                lineHeight: 22,
              }}>
                We believe that everyone should have the opportunity to participate in 
                the digital revolution, regardless of their technical expertise or 
                financial resources.
              </Typography>
            </View>
          </Card>

          {/* Features Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ padding: Spacing.lg }}>
              <Typography variant="h3" weight="semibold" style={{ 
                marginBottom: Spacing.lg,
                color: Colors.primary.blue,
              }}>
                Why Choose CELF?
              </Typography>

              {features.map((feature, index) => (
                <View key={index} style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < features.length - 1 ? Spacing.lg : 0,
                }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.primary.blue + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: Spacing.md,
                  }}>
                    <Ionicons 
                      name={feature.icon as any} 
                      size={20} 
                      color={Colors.primary.blue} 
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Typography variant="bodyMedium" weight="medium" style={{ 
                      marginBottom: 4,
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="bodySmall" color="secondary" style={{ 
                      lineHeight: 18,
                    }}>
                      {feature.description}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Stats Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ padding: Spacing.lg }}>
              <Typography variant="h3" weight="semibold" style={{ 
                marginBottom: Spacing.lg,
                textAlign: 'center',
                color: Colors.primary.blue,
              }}>
                Join Our Growing Community
              </Typography>

              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
                {stats.map((stat, index) => (
                  <View key={index} style={{
                    width: '48%',
                    alignItems: 'center',
                    marginBottom: Spacing.md,
                  }}>
                    <Typography variant="h2" weight="bold" style={{ 
                      color: Colors.primary.blue,
                      marginBottom: 4,
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="bodySmall" color="secondary">
                      {stat.label}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
          </Card>

          {/* Vision Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <View style={{ padding: Spacing.lg }}>
              <Typography variant="h3" weight="semibold" style={{ 
                marginBottom: Spacing.md,
                color: Colors.primary.blue,
              }}>
                Our Vision
              </Typography>
              
              <Typography variant="bodyMedium" style={{ 
                lineHeight: 22,
                marginBottom: Spacing.md,
              }}>
                To create a world where cryptocurrency mining is sustainable, accessible, 
                and beneficial for all participants in the global digital economy.
              </Typography>

              <Typography variant="bodyMedium" style={{ 
                lineHeight: 22,
              }}>
                We envision a future where CELF becomes the leading platform for 
                mobile mining, empowering millions of users worldwide to earn and 
                participate in the decentralized finance ecosystem.
              </Typography>
            </View>
          </Card>

          {/* Contact Section */}
          <Card variant="default">
            <View style={{ padding: Spacing.lg, alignItems: 'center' }}>
              <Typography variant="h3" weight="semibold" style={{ 
                marginBottom: Spacing.md,
                color: Colors.primary.blue,
              }}>
                Get In Touch
              </Typography>
              
              <Typography variant="bodyMedium" color="secondary" style={{ 
                textAlign: 'center',
                marginBottom: Spacing.lg,
              }}>
                Have questions or want to learn more about CELF? 
                We'd love to hear from you.
              </Typography>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="mail" size={24} color={Colors.primary.blue} />
                  <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
                    Email
                  </Typography>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-twitter" size={24} color={Colors.primary.blue} />
                  <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
                    Twitter
                  </Typography>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-discord" size={24} color={Colors.primary.blue} />
                  <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
                    Discord
                  </Typography>
                </View>
              </View>
            </View>
          </Card>

        </View>
      </ScrollView>
    </View>
  );
}
