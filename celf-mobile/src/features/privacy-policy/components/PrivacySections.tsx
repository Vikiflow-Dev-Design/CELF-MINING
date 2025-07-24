/**
 * Privacy Sections Component
 * Shows privacy policy sections
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { privacySections } from '../data';
import { getDataTypeColor, getDataTypeLabel } from '../utils';
import type { PrivacySection } from '../types';

interface PrivacySectionsProps {
  onSectionPress: (section: PrivacySection) => void;
}

export const PrivacySections: React.FC<PrivacySectionsProps> = ({
  onSectionPress,
}) => {
  return (
    <View style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Privacy Policy Sections
      </Typography>
      
      <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
        Here's an overview of how we handle your data. Click any section to read the full details.
      </Typography>
      
      <View style={{ gap: Spacing.sm }}>
        {privacySections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => onSectionPress(section)}
          >
            <Card variant="default">
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: getDataTypeColor(section.dataType) + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name={section.icon as any} size={20} color={getDataTypeColor(section.dataType)} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
                    <Typography variant="bodyMedium" weight="semibold" style={{ flex: 1 }}>
                      {section.title}
                    </Typography>
                    <View style={{
                      backgroundColor: getDataTypeColor(section.dataType) + '20',
                      paddingHorizontal: Spacing.sm,
                      paddingVertical: 2,
                      borderRadius: BorderRadius.sm,
                    }}>
                      <Typography variant="bodySmall" style={{ color: getDataTypeColor(section.dataType) }} weight="medium">
                        {getDataTypeLabel(section.dataType)}
                      </Typography>
                    </View>
                  </View>
                  <Typography variant="bodySmall" color="secondary" numberOfLines={2}>
                    {section.summary}
                  </Typography>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} style={{ marginLeft: Spacing.sm }} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
