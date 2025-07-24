/**
 * Contact Support Component
 * Shows contact support options
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import type { ContactOption } from '../types';

interface ContactSupportProps {
  contactOptions: ContactOption[];
}

export const ContactSupport: React.FC<ContactSupportProps> = ({
  contactOptions,
}) => {
  return (
    <View style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Contact Support
      </Typography>
      
      <View style={{ gap: Spacing.md }}>
        {contactOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={option.action}
          >
            <Card variant="default">
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: option.color + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name={option.icon as any} size={24} color={option.color} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyLarge" weight="semibold" style={{ marginBottom: Spacing.xs }}>
                    {option.title}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {option.description}
                  </Typography>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
