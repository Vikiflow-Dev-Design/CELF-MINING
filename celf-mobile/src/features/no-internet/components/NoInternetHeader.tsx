/**
 * No Internet Header Component
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

const NoInternetHeader: React.FC = () => {
  return (
    <View style={{ alignItems: 'center', marginBottom: Spacing['2xl'] }}>
      <View style={{
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.secondary.warning + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
      }}>
        <Ionicons name="wifi-off" size={60} color={Colors.secondary.warning} />
      </View>
      
      <Typography variant="h1" weight="bold" style={{ textAlign: 'center', marginBottom: Spacing.md }}>
        No Internet Connection
      </Typography>
      
      <Typography variant="bodyLarge" color="secondary" style={{ textAlign: 'center', lineHeight: 24 }}>
        Please check your internet connection and try again. CELF requires an active internet connection to function properly.
      </Typography>
    </View>
  );
};


export default NoInternetHeader;
