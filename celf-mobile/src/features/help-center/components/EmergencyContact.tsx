/**
 * Emergency Contact Component
 * Shows emergency support contact option
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface EmergencyContactProps {
  onPress: () => void;
}

export const EmergencyContact: React.FC<EmergencyContactProps> = ({ onPress }) => {
  return (
    <Card 
      variant="default" 
      style={{ 
        backgroundColor: Colors.secondary.error + '10',
        borderWidth: 1,
        borderColor: Colors.secondary.error + '30',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.secondary.error + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="warning" size={20} color={Colors.secondary.error} />
        </View>
        <Typography variant="h3" weight="semibold" style={{ color: Colors.secondary.error }}>
          Emergency Support
        </Typography>
      </View>
      
      <Typography variant="bodyMedium" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
        For urgent security issues, account compromises, or critical problems that require immediate attention.
      </Typography>
      
      <Button
        title="Emergency Contact"
        onPress={onPress}
        variant="secondary"
        icon={<Ionicons name="call" size={20} color={Colors.secondary.error} />}
        style={{
          borderColor: Colors.secondary.error,
          backgroundColor: Colors.secondary.error + '10',
        }}
      />
    </Card>
  );
};
