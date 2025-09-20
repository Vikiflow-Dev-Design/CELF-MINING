/**
 * Profile Form Component
 */

import React from 'react';
import { View, TextInput } from 'react-native';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing, BorderRadius } from '@/constants/design-tokens';
import type { ProfileData } from '../types';

interface ProfileFormProps {
  profileData: ProfileData;
  onUpdateField: (field: keyof ProfileData, value: string) => void;
}

// Move FormField outside to prevent re-creation on every render
const FormField: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  editable?: boolean;
}> = React.memo(({ label, value, onChangeText, placeholder, multiline = false, editable = true }) => (
  <View style={{ marginBottom: Spacing.lg }}>
    <Typography variant="bodyMedium" weight="semibold" style={{ marginBottom: Spacing.sm }}>
      {label}
    </Typography>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      editable={editable}
      style={{
        backgroundColor: editable ? Colors.background.primary : Colors.background.tertiary,
        borderWidth: 1,
        borderColor: Colors.border.primary,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        fontSize: 16,
        color: editable ? Colors.text.primary : Colors.text.secondary,
        minHeight: multiline ? 80 : 48,
        textAlignVertical: multiline ? 'top' : 'center',
      }}
    />
  </View>
));

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData,
  onUpdateField,
}) => {

  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Profile Information
      </Typography>
      
      <FormField
        label="Username"
        value={profileData.username}
        onChangeText={(text) => onUpdateField('username', text)}
        placeholder="Enter username"
      />
      
      <FormField
        label="Display Name"
        value={profileData.displayName}
        onChangeText={(text) => onUpdateField('displayName', text)}
        placeholder="Enter display name"
      />
      
      <FormField
        label="Bio"
        value={profileData.bio}
        onChangeText={(text) => onUpdateField('bio', text)}
        placeholder="Tell us about yourself"
        multiline
      />
      
      <FormField
        label="Email"
        value={profileData.email}
        onChangeText={(text) => onUpdateField('email', text)}
        placeholder="Enter email"
      />
      
      <FormField
        label="Phone"
        value={profileData.phone}
        onChangeText={(text) => onUpdateField('phone', text)}
        placeholder="Enter phone number"
      />
      
      <FormField
        label="Country"
        value={profileData.country}
        onChangeText={(text) => onUpdateField('country', text)}
        placeholder="Enter country"
      />
      
      <FormField
        label="Member Since"
        value={profileData.joinDate}
        onChangeText={() => {}}
        editable={false}
      />
    </Card>
  );
};

export default ProfileForm;
