/**
 * Welcome Header Component
 * Shows welcome message for help center
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

export const WelcomeHeader: React.FC = () => {
  return (
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
        <Ionicons name="help-circle" size={30} color={Colors.neutral.white} />
      </View>
      
      <Typography variant="h2" color="inverse" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.sm }}>
        How can we help?
      </Typography>
      
      <Typography variant="bodyLarge" color="inverse" style={{ textAlign: 'center', opacity: 0.9 }}>
        Find answers to common questions or get in touch with our support team
      </Typography>
    </Card>
  );
};
