/**
 * FAQ Section Component
 * Shows quick FAQ items
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { FAQItem } from '../types';

interface FAQSectionProps {
  faqItems: FAQItem[];
  onFAQPress: (faq: FAQItem) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqItems,
  onFAQPress,
}) => {
  const themeColors = useThemeColors();
  return (
    <View style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Quick FAQ
      </Typography>
      
      <View style={{ gap: Spacing.sm }}>
        {faqItems.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            onPress={() => onFAQPress(faq)}
            style={{
              backgroundColor: themeColors.background.primary,
              borderRadius: BorderRadius.md,
              // Removed white borders for better dark theme appearance
            }}
          >
            <Card variant="default" style={{ margin: 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: themeColors.primary.blue + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: Spacing.md,
                }}>
                  <Ionicons name={faq.icon as any} size={20} color={themeColors.icon.primary} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" weight="semibold" numberOfLines={1}>
                    {faq.question}
                  </Typography>
                  <Typography variant="bodySmall" color="secondary">
                    {faq.category}
                  </Typography>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color={themeColors.icon.tertiary} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
