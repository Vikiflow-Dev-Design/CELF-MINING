/**
 * Data Rights Component
 * Shows data rights actions
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface DataRightsProps {
  onDataExport: () => void;
  onDataDeletion: () => void;
}

export const DataRights: React.FC<DataRightsProps> = ({
  onDataExport,
  onDataDeletion,
}) => {
  return (
    <View style={{ gap: Spacing.md }}>
      <Typography variant="h3" weight="semibold">
        Your Data Rights
      </Typography>
      
      <Button
        title="Request Data Export"
        onPress={onDataExport}
        variant="secondary"
        icon={<Ionicons name="download-outline" size={20} color={Colors.primary.blue} />}
      />
      
      <Button
        title="Delete My Data"
        onPress={onDataDeletion}
        variant="secondary"
        icon={<Ionicons name="trash-outline" size={20} color={Colors.secondary.error} />}
        style={{
          borderColor: Colors.secondary.error,
          backgroundColor: Colors.secondary.error + '10',
        }}
      />
    </View>
  );
};
