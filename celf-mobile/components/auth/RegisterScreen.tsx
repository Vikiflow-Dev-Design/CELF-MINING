/**
 * Register Screen Component
 * Handles user registration with email/password and name
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { validateRegistrationForm, formatValidationErrors } from '@/utils/validation';
import { useThemeColors } from '@/hooks/useThemeColors';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { signUp, error, clearError } = useAuthStore();
  const themeColors = useThemeColors();

  const handleRegister = async () => {
    // Clear previous validation errors
    setValidationErrors([]);
    clearError();

    // Frontend validation
    const validation = validateRegistrationForm(firstName, lastName, email, password, confirmPassword);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      Alert.alert('Validation Error', formatValidationErrors(validation.errors));
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      await signUp(email.trim(), password, firstName.trim(), lastName.trim());
      Alert.alert(
        'Registration Successful',
        'Your account has been created! Please sign in with your credentials.',
        [{ text: 'OK', onPress: onSwitchToLogin }]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error instanceof Error ? error.message : 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join CELF and start mining tokens</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Fields Row */}
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={[styles.label, { color: themeColors.text.primary }]}>First Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: themeColors.text.primary,
                      backgroundColor: themeColors.background.secondary,
                      borderColor: themeColors.border.primary,
                    }
                  ]}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  placeholderTextColor={themeColors.text.tertiary}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={[styles.label, { color: themeColors.text.primary }]}>Last Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: themeColors.text.primary,
                      backgroundColor: themeColors.background.secondary,
                      borderColor: themeColors.border.primary,
                    }
                  ]}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  placeholderTextColor={themeColors.text.tertiary}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: themeColors.text.primary }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: themeColors.text.primary,
                    backgroundColor: themeColors.background.secondary,
                    borderColor: themeColors.border.primary,
                  }
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={themeColors.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {/* Password Input with Strength Indicator */}
            <PasswordInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              showStrengthIndicator={true}
              editable={!isLoading}
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Confirm Password Input */}
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              editable={!isLoading}
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <View style={styles.errorContainer}>
                {validationErrors.map((error, index) => (
                  <Text key={index} style={[styles.errorText, { color: themeColors.status.error }]}>
                    • {error}
                  </Text>
                ))}
              </View>
            )}

            {/* Backend Errors */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: themeColors.status.error }]}>{error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onSwitchToLogin} disabled={isLoading}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    backgroundColor: '#fee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});
