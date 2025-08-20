/**
 * Logout Tester Component
 * Simple component to test different logout methods
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useLogout } from '@/utils/logout';
import { performLogout, performDirectLogout } from '@/utils/logout';

export const LogoutTester: React.FC = () => {
  const themeColors = useThemeColors();
  const { logout, directLogout, isLoading } = useLogout();

  const testHookLogout = () => {
    console.log('🧪 Testing hook-based logout...');
    logout('Hook Test');
  };

  const testHookDirectLogout = async () => {
    console.log('🧪 Testing hook-based direct logout...');
    try {
      await directLogout('Hook Direct Test');
      console.log('✅ Hook direct logout completed');
    } catch (error) {
      console.error('❌ Hook direct logout failed:', error);
    }
  };

  const testUtilityLogout = () => {
    console.log('🧪 Testing utility-based logout...');
    performLogout('Utility Test');
  };

  const testUtilityDirectLogout = async () => {
    console.log('🧪 Testing utility-based direct logout...');
    try {
      await performDirectLogout('Utility Direct Test');
      console.log('✅ Utility direct logout completed');
    } catch (error) {
      console.error('❌ Utility direct logout failed:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background.secondary }]}>
      <Text style={[styles.title, { color: themeColors.text.primary }]}>
        Logout Tester
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.primary.blue }]}
          onPress={testHookLogout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Hook Logout'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.status.warning }]}
          onPress={testHookDirectLogout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            Hook Direct
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.status.success }]}
          onPress={testUtilityLogout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            Utility Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.status.error }]}
          onPress={testUtilityDirectLogout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            Utility Direct
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.note, { color: themeColors.text.tertiary }]}>
        Test different logout methods to see which one works.
        Check console for detailed logs.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    minWidth: '45%',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 11,
  },
  note: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
