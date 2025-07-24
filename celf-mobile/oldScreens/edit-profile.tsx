import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Typography } from '@/components/ui';
import { Header } from '@/components/navigation/Header';
import { useNavigation } from '@/components/navigation/NavigationContext';
import { Colors, Spacing, Layout, BorderRadius } from '@/constants/design-tokens';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const { toggleSidebar } = useNavigation();
  
  // Mock current user data
  const [profileData, setProfileData] = useState({
    profilePicture: null as string | null,
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'CELF mining enthusiast and crypto investor. Building the future of digital currency!',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    joinDate: '2024-12-15',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateField('profilePicture', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateField('profilePicture', result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose how you want to update your profile picture',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const saveChanges = async () => {
    if (!hasChanges) {
      router.back();
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasChanges(false);
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 1500);
  };

  const cancelChanges = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.secondary }}>
      <Header
        title="Edit Profile"
        onMenuPress={toggleSidebar}
        leftAction={
          <TouchableOpacity onPress={cancelChanges}>
            <Ionicons name="close" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        }
        rightAction={
          <TouchableOpacity onPress={saveChanges} disabled={isLoading}>
            <Typography variant="bodyMedium" weight="semibold" color="primary">
              {isLoading ? 'Saving...' : 'Save'}
            </Typography>
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: Layout.screenMargin.mobile,
          paddingTop: Spacing['2xl'],
          paddingBottom: 32,
        }}>
          
          {/* Profile Picture Section */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'], alignItems: 'center' }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Profile Picture
            </Typography>
            
            <TouchableOpacity onPress={showImagePicker} style={{ alignItems: 'center' }}>
              <View style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: Colors.background.tertiary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.md,
                borderWidth: 3,
                borderColor: Colors.primary.blue,
              }}>
                {profileData.profilePicture ? (
                  <Image 
                    source={{ uri: profileData.profilePicture }} 
                    style={{ width: 114, height: 114, borderRadius: 57 }}
                  />
                ) : (
                  <Ionicons name="person" size={48} color={Colors.text.tertiary} />
                )}
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: Colors.primary.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: Colors.background.primary,
                }}>
                  <Ionicons name="camera" size={16} color={Colors.neutral.white} />
                </View>
              </View>
              <Typography variant="bodyMedium" color="primary" weight="semibold">
                Change Photo
              </Typography>
            </TouchableOpacity>
          </Card>

          {/* Basic Information */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Basic Information
            </Typography>
            
            <View style={{ gap: Spacing.lg }}>
              {/* Username */}
              <View>
                <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.sm }}>
                  Username
                </Typography>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.background.tertiary,
                  borderRadius: BorderRadius.md,
                  paddingHorizontal: Spacing.md,
                }}>
                  <Typography variant="bodyMedium" color="secondary" style={{ marginRight: Spacing.xs }}>
                    @
                  </Typography>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Colors.text.primary,
                      paddingVertical: Spacing.md,
                    }}
                    value={profileData.username}
                    onChangeText={(value) => updateField('username', value)}
                    placeholder="Enter username"
                    placeholderTextColor={Colors.text.tertiary}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Display Name */}
              <View>
                <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.sm }}>
                  Display Name
                </Typography>
                <TextInput
                  style={{
                    backgroundColor: Colors.background.tertiary,
                    borderRadius: BorderRadius.md,
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.md,
                    fontSize: 16,
                    color: Colors.text.primary,
                  }}
                  value={profileData.displayName}
                  onChangeText={(value) => updateField('displayName', value)}
                  placeholder="Enter display name"
                  placeholderTextColor={Colors.text.tertiary}
                />
              </View>

              {/* Bio */}
              <View>
                <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.sm }}>
                  Bio
                </Typography>
                <TextInput
                  style={{
                    backgroundColor: Colors.background.tertiary,
                    borderRadius: BorderRadius.md,
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.md,
                    fontSize: 16,
                    color: Colors.text.primary,
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }}
                  value={profileData.bio}
                  onChangeText={(value) => updateField('bio', value)}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor={Colors.text.tertiary}
                  multiline
                  maxLength={200}
                />
                <Typography variant="bodySmall" color="tertiary" style={{ marginTop: Spacing.xs, textAlign: 'right' }}>
                  {profileData.bio.length}/200
                </Typography>
              </View>
            </View>
          </Card>

          {/* Contact Information */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Contact Information
            </Typography>
            
            <View style={{ gap: Spacing.lg }}>
              {/* Email */}
              <View>
                <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.sm }}>
                  Email Address
                </Typography>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.background.tertiary,
                  borderRadius: BorderRadius.md,
                  paddingHorizontal: Spacing.md,
                }}>
                  <Ionicons name="mail-outline" size={20} color={Colors.text.secondary} style={{ marginRight: Spacing.sm }} />
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Colors.text.primary,
                      paddingVertical: Spacing.md,
                    }}
                    value={profileData.email}
                    onChangeText={(value) => updateField('email', value)}
                    placeholder="Enter email address"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Phone */}
              <View>
                <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.sm }}>
                  Phone Number
                </Typography>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.background.tertiary,
                  borderRadius: BorderRadius.md,
                  paddingHorizontal: Spacing.md,
                }}>
                  <Ionicons name="call-outline" size={20} color={Colors.text.secondary} style={{ marginRight: Spacing.sm }} />
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Colors.text.primary,
                      paddingVertical: Spacing.md,
                    }}
                    value={profileData.phone}
                    onChangeText={(value) => updateField('phone', value)}
                    placeholder="Enter phone number"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Country */}
              <View>
                <Typography variant="bodyMedium" weight="medium" style={{ marginBottom: Spacing.sm }}>
                  Country
                </Typography>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.background.tertiary,
                  borderRadius: BorderRadius.md,
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.md,
                }}>
                  <Ionicons name="location-outline" size={20} color={Colors.text.secondary} style={{ marginRight: Spacing.sm }} />
                  <Typography variant="bodyMedium" style={{ flex: 1 }}>
                    {profileData.country}
                  </Typography>
                  <Ionicons name="chevron-down" size={20} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Account Info */}
          <Card variant="default" style={{ marginBottom: Spacing['2xl'] }}>
            <Typography variant="h3" weight="semibold" style={{ marginBottom: Spacing.lg }}>
              Account Information
            </Typography>
            
            <View style={{ gap: Spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="bodyMedium" color="secondary">Member Since</Typography>
                <Typography variant="bodyMedium" weight="medium">
                  {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </View>
            </View>
          </Card>

          {/* Save Button */}
          <Button
            title={isLoading ? "Saving Changes..." : "Save Changes"}
            onPress={saveChanges}
            variant="primary"
            size="large"
            disabled={!hasChanges || isLoading}
            loading={isLoading}
            icon={<Ionicons name="checkmark" size={20} color={Colors.neutral.white} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
