/**
 * Privacy Header Component
 * Header card for privacy policy screen
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { lastUpdated, version } from '../data';

export const PrivacyHeader: React.FC = () => {
  return (
    <Card 
      variant="gradient" 
      gradientColors={[Colors.secondary.success, Colors.secondary.success + 'CC']}
      style={{ 
        backgroundColor: Colors.secondary.success,
        shadowColor: Colors.secondary.success,
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
        <Ionicons name="shield-checkmark" size={30} color={Colors.neutral.white} />
      </View>
      
      <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
        Privacy Policy
      </Typography>
      
      <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9, marginBottom: Spacing.md }}>
        Your privacy and data protection rights
      </Typography>
      
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
      }}>
        <Typography variant="bodySmall" color="inverse" weight="semibold">
          Version {version} • Updated {lastUpdated}
        </Typography>
      </View>
    </Card>
  );
};
