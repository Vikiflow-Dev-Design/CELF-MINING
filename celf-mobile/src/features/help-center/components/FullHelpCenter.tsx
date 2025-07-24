/**
 * Full Help Center Component
 * Shows link to visit full help center
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface FullHelpCenterProps {
  onPress: () => void;
}

export const FullHelpCenter: React.FC<FullHelpCenterProps> = ({ onPress }) => {
  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: Colors.secondary.info + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing.md,
        }}>
          <Ionicons name="globe" size={24} color={Colors.secondary.info} />
        </View>
        
        <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.sm }}>
          Need More Help?
        </Typography>
        
        <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.lg }}>
          Visit our comprehensive help center for detailed guides, tutorials, and documentation
        </Typography>
        
        <Button
          title="Visit Full Help Center"
          onPress={onPress}
          variant="primary"
          icon={<Ionicons name="open-outline" size={20} color={Colors.neutral.white} />}
          style={{
            shadowColor: Colors.primary.blue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        />
      </View>
    </Card>
  );
};
