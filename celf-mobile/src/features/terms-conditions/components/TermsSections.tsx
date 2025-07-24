/**
 * Terms Sections Component
 * Shows terms and conditions sections
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { termsSections } from '../data';
import { getImportanceColor, getImportanceLabel } from '../utils';
import type { TermsSection } from '../types';

interface TermsSectionsProps {
  onSectionPress: (section: TermsSection) => void;
}

export const TermsSections: React.FC<TermsSectionsProps> = ({
  onSectionPress,
}) => {
  return (
    <View style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Terms Summary
      </Typography>
      
      <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
        Here's a quick overview of the key sections in our terms and conditions. Click any section to read the full details.
      </Typography>
      
      <View style={{ gap: Spacing.sm }}>
        {termsSections.map((section) => (
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
                  backgroundColor: getImportanceColor(section.importance) + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name={section.icon as any} size={20} color={getImportanceColor(section.importance)} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs }}>
                    <Typography variant="bodyMedium" weight="semibold" style={{ flex: 1 }}>
                      {section.title}
                    </Typography>
                    <View style={{
                      backgroundColor: getImportanceColor(section.importance) + '20',
                      paddingHorizontal: Spacing.sm,
                      paddingVertical: 2,
                      borderRadius: BorderRadius.sm,
                    }}>
                      <Typography variant="bodySmall" style={{ color: getImportanceColor(section.importance) }} weight="medium">
                        {getImportanceLabel(section.importance)}
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
