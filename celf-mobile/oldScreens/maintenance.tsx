import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius, shadows } from '@/constants/design-tokens';
import { router } from 'expo-router';

export default function MaintenanceScreen() {
  const handleContactSupport = () => {
    // Handle contact support logic
    console.log('Contacting support...');
  };

  const handleRetry = () => {
    // Retry connection logic
    console.log('Retrying connection...');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.primary }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.xl
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon Section */}
        <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
          <View style={{
            width: 96,
            height: 96,
            backgroundColor: Colors.secondary.warning + '20',
            borderRadius: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.lg,
            ...shadows.md
          }}>
            <Ionicons
              name="construct-outline"
              size={48}
              color={Colors.secondary.warning}
            />
          </View>

          <Typography
            variant="h1"
            color="primary"
            weight="bold"
            align="center"
            style={{ marginBottom: Spacing.sm }}
          >
            Under Maintenance
          </Typography>

          <Typography
            variant="bodyLarge"
            color="secondary"
            align="center"
            style={{ lineHeight: 24 }}
          >
            We're currently performing scheduled maintenance to improve your experience.
          </Typography>
        </View>

        {/* Maintenance Info Card */}
        <Card style={{ marginBottom: Spacing.lg }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Spacing.sm
          }}>
            <Ionicons
              name="time-outline"
              size={20}
              color={Colors.secondary.warning}
            />
            <Typography
              variant="h4"
              color="warning"
              weight="semibold"
              style={{ marginLeft: Spacing.sm }}
            >
              Estimated Time
            </Typography>
          </View>
          <Typography variant="bodyMedium" color="secondary">
            Maintenance is expected to complete in approximately 2 hours.
          </Typography>
        </Card>

        {/* Status Updates Card */}
        <Card style={{ marginBottom: Spacing.lg }}>
          <Typography
            variant="h4"
            color="primary"
            weight="semibold"
            style={{ marginBottom: Spacing.md }}
          >
            What we're working on:
          </Typography>

          <View style={{ gap: Spacing.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 8,
                height: 8,
                backgroundColor: Colors.secondary.success,
                borderRadius: 4,
                marginRight: Spacing.sm
              }} />
              <Typography variant="bodyMedium" color="secondary">
                Server infrastructure upgrade
              </Typography>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 8,
                height: 8,
                backgroundColor: Colors.secondary.warning,
                borderRadius: 4,
                marginRight: Spacing.sm
              }} />
              <Typography variant="bodyMedium" color="secondary">
                Mining algorithm optimization
              </Typography>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 8,
                height: 8,
                backgroundColor: Colors.neutral[300],
                borderRadius: 4,
                marginRight: Spacing.sm
              }} />
              <Typography variant="bodyMedium" color="secondary">
                Security enhancements
              </Typography>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={{ gap: Spacing.sm, marginBottom: Spacing.lg }}>
          <Button
            title="Check Again"
            onPress={handleRetry}
            variant="primary"
            size="large"
            icon={<Ionicons name="refresh" size={20} color={Colors.text.inverse} />}
            iconPosition="left"
          />

          <Button
            title="Contact Support"
            onPress={handleContactSupport}
            variant="secondary"
            size="large"
            icon={<Ionicons name="help-circle-outline" size={20} color={Colors.primary.blue} />}
            iconPosition="left"
          />
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center' }}>
          <Typography
            variant="caption"
            color="tertiary"
            align="center"
          >
            Thank you for your patience. We'll be back soon!
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
}
