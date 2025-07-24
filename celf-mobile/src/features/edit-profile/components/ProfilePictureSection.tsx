/**
 * Profile Picture Section Component
 */

import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components/ui';
import { Colors, Spacing } from '@/constants/design-tokens';

interface ProfilePictureSectionProps {
  profilePicture: string | null;
  onPickImage: () => void;
}

const ProfilePictureSection: React.FC<ProfilePictureSectionProps> = ({
  profilePicture,
  onPickImage,
}) => {
  return (
    <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
      <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
        Profile Picture
      </Typography>
      
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={onPickImage} style={{ position: 'relative' }}>
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: Colors.background.tertiary,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Ionicons name="person" size={60} color={Colors.text.tertiary} />
            )}
          </View>
          
          <View style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: Colors.primary.blue,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: Colors.background.primary,
          }}>
            <Ionicons name="camera" size={18} color={Colors.neutral.white} />
          </View>
        </TouchableOpacity>
        
        <Typography variant="bodySmall" color="secondary" style={{ marginTop: Spacing.md, textAlign: 'center' }}>
          Tap to change your profile picture
        </Typography>
      </View>
    </Card>
  );
};

export default ProfilePictureSection