/**
 * What's New Section Component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { WhatsNewItem } from '../types';
import { getTypeColor, getTypeLabel } from '../utils';

interface WhatsNewCardProps {
  items: WhatsNewItem[];
  onOpenChangelog: () => void;
}

export const WhatsNewCard: React.FC<WhatsNewCardProps> = ({
  items,
  onOpenChangelog,
}) => {
  return (
    <Card variant="default">
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: Spacing.lg 
      }}>
        <Typography variant="h3" weight="semibold">
          What's New
        </Typography>
        <TouchableOpacity onPress={onOpenChangelog}>
          <Typography variant="bodySmall" color="primary" weight="semibold">
            View All
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={{ gap: Spacing.md }}>
        {items.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              gap: Spacing.md,
              paddingVertical: Spacing.sm,
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: `${getTypeColor(item.type)}20`,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={getTypeColor(item.type)} 
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: Spacing.xs,
                marginBottom: Spacing.xs 
              }}>
                <Typography variant="bodyMedium" weight="semibold">
                  {item.title}
                </Typography>
                <View
                  style={{
                    paddingHorizontal: Spacing.xs,
                    paddingVertical: 2,
                    backgroundColor: getTypeColor(item.type),
                    borderRadius: BorderRadius.xs,
                  }}>
                  <Typography 
                    variant="caption" 
                    weight="bold" 
                    style={{ color: Colors.neutral.white }}
                  >
                    {getTypeLabel(item.type)}
                  </Typography>
                </View>
              </View>
              
              <Typography variant="bodySmall" color="secondary">
                {item.description}
              </Typography>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};
