/**
 * Privacy Controls Component
 * Shows privacy control toggles
 */

import React from 'react';
import { View, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { PrivacyControl } from '../types';

interface PrivacyControlsProps {
  controls: PrivacyControl[];
  onToggle: (controlId: string) => void;
}

export const PrivacyControls: React.FC<PrivacyControlsProps> = ({
  controls,
  onToggle,
}) => {
  const themeColors = useThemeColors();
  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: themeColors.primary.blue + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: Spacing.md,
        }}>
          <Ionicons name="settings" size={20} color={themeColors.icon.primary} />
        </View>
        <Typography variant="h3" weight="semibold">
          Privacy Controls
        </Typography>
      </View>
      
      <Typography variant="bodyMedium" color="secondary" style={{ marginBottom: Spacing.lg, lineHeight: 22 }}>
        Manage your privacy preferences and control how your data is used.
      </Typography>
      
      <View style={{ gap: Spacing.md }}>
        {controls.map((control) => (
          <TouchableOpacity
            key={control.id}
            onPress={() => !control.isRequired && onToggle(control.id)}
            disabled={control.isRequired}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: themeColors.background.tertiary,
              borderRadius: 12,
              padding: Spacing.md,
              opacity: control.isRequired ? 0.6 : 1,
            }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: themeColors.primary.blue + '15',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Spacing.md,
            }}>
              <Ionicons name={control.icon as any} size={20} color={themeColors.icon.primary} />
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="bodyMedium" weight="semibold" style={{ flex: 1 }}>
                  {control.title}
                </Typography>
                {control.isRequired && (
                  <Typography variant="bodySmall" color="secondary" style={{ marginRight: Spacing.sm }}>
                    Required
                  </Typography>
                )}
              </View>
              <Typography variant="bodySmall" color="secondary">
                {control.description}
              </Typography>
            </View>
            
            <Switch
              value={control.isEnabled}
              onValueChange={() => !control.isRequired && onToggle(control.id)}
              disabled={control.isRequired}
              trackColor={{
                false: themeColors.background.secondary,
                true: themeColors.primary.blue + '40'
              }}
              thumbColor={control.isEnabled ? themeColors.primary.blue : themeColors.text.tertiary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
};
