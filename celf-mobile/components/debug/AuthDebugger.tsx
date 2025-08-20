/**
 * Auth Debugger Component
 * Helps debug authentication state and logout issues
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { useThemeColors } from '@/hooks/useThemeColors';

export const AuthDebugger: React.FC = () => {
  const { user, isSignedIn, isLoading, signOut } = useAuthStore();
  const themeColors = useThemeColors();

  const handleTestLogout = async () => {
    console.log('🧪 Testing logout from debugger...');
    try {
      await signOut();
      Alert.alert('Success', 'Logout completed');
    } catch (error) {
      console.error('Logout test failed:', error);
      Alert.alert('Error', 'Logout failed: ' + error);
    }
  };

  const handleForceLogout = () => {
    console.log('🔧 Force logout - clearing state directly...');
    useAuthStore.setState({
      user: null,
      isSignedIn: false,
      isLoading: false,
      error: null,
    });
    Alert.alert('Force Logout', 'Auth state cleared directly');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Text style={[styles.title, { color: themeColors.text.primary }]}>
        Auth Debugger
      </Text>
      
      <View style={styles.section}>
        <Text style={[styles.label, { color: themeColors.text.secondary }]}>
          Auth State:
        </Text>
        <Text style={[styles.value, { color: themeColors.text.primary }]}>
          isSignedIn: {isSignedIn ? 'true' : 'false'}
        </Text>
        <Text style={[styles.value, { color: themeColors.text.primary }]}>
          isLoading: {isLoading ? 'true' : 'false'}
        </Text>
        <Text style={[styles.value, { color: themeColors.text.primary }]}>
          hasUser: {user ? 'true' : 'false'}
        </Text>
        {user && (
          <Text style={[styles.value, { color: themeColors.text.primary }]}>
            email: {user.email}
          </Text>
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.status.warning }]}
          onPress={handleTestLogout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging Out...' : 'Test Logout'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.status.error }]}
          onPress={handleForceLogout}
        >
          <Text style={styles.buttonText}>
            Force Logout
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.note, { color: themeColors.text.tertiary }]}>
        This component helps debug auth state issues.
        If "Test Logout" doesn't work, try "Force Logout".
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 2,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  note: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
