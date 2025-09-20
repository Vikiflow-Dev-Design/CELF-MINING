/**
 * Category Tabs Component
 * Displays task category filter tabs
 */

import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { TaskCategory, CategoryKey } from '../types';

interface CategoryTabsProps {
  categories: TaskCategory[];
  selectedCategory: CategoryKey;
  onCategorySelect: (category: CategoryKey) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const themeColors = useThemeColors();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: Spacing.sm }}
    >
      <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.key;
          
          return (
            <TouchableOpacity
              key={category.key}
              onPress={() => onCategorySelect(category.key as CategoryKey)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: Spacing.md,
                paddingVertical: Spacing.sm,
                borderRadius: BorderRadius.full,
                backgroundColor: isSelected 
                  ? Colors.primary.blue 
                  : themeColors.background.tertiary,
                borderWidth: isSelected ? 0 : 1,
                borderColor: themeColors.border.primary,
                minWidth: 80,
              }}
            >
              <Ionicons 
                name={category.icon as any} 
                size={16} 
                color={isSelected ? Colors.neutral.white : themeColors.icon.primary}
                style={{ marginRight: Spacing.xs }}
              />
              <Typography 
                variant="bodySmall" 
                weight="medium"
                style={{ 
                  color: isSelected ? Colors.neutral.white : themeColors.text.primary 
                }}
              >
                {category.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
