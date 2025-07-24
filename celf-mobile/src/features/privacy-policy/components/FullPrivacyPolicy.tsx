/**
 * Full Privacy Policy Component
 * Shows links to full privacy policy
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface FullPrivacyPolicyProps {
  onReadFullPolicy: () => void;
  onDownload: () => void;
}

export const FullPrivacyPolicy: React.FC<FullPrivacyPolicyProps> = ({
  onReadFullPolicy,
  onDownload,
}) => {
  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: Colors.primary.blue + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing.md,
        }}>
          <Ionicons name="globe" size={24} color={Colors.primary.blue} />
        </View>
        
        <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.sm }}>
          Complete Privacy Policy
        </Typography>
        
        <Typography variant="bodyMedium" color="secondary" style={{ textAlign: 'center', marginBottom: Spacing.lg }}>
          Read the full privacy policy with detailed information about data handling
        </Typography>
        
        <Button
          title="Read Full Privacy Policy"
          onPress={onReadFullPolicy}
          variant="primary"
          icon={<Ionicons name="open-outline" size={20} color={Colors.neutral.white} />}
          style={{
            shadowColor: Colors.primary.blue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: Spacing.md,
          }}
        />
        
        <Button
          title="Download PDF"
          onPress={onDownload}
          variant="secondary"
          icon={<Ionicons name="download-outline" size={20} color={Colors.primary.blue} />}
        />
      </View>
    </Card>
  );
};
