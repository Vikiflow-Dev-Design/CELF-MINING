/**
 * Password Input Component
 * Reusable password input with visibility toggle and validation
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getPasswordStrength } from '@/utils/validation';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  showStrengthIndicator?: boolean;
  containerStyle?: any;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  showStrengthIndicator = false,
  containerStyle,
  value = '',
  onChangeText,
  ...textInputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const themeColors = useThemeColors();
  
  const passwordStrength = showStrengthIndicator ? getPasswordStrength(value) : null;
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return '#ff4444';
      case 'fair': return '#ff8800';
      case 'good': return '#44aa44';
      case 'strong': return '#00aa00';
      default: return themeColors.text.tertiary;
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: themeColors.text.primary }]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        {
          borderColor: error ? themeColors.status.error : themeColors.border.primary,
          backgroundColor: themeColors.background.secondary,
        }
      ]}>
        <TextInput
          style={[
            styles.input,
            {
              color: themeColors.text.primary,
              flex: 1,
            }
          ]}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={themeColors.text.tertiary}
          {...textInputProps}
        />
        
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={themeColors.text.secondary}
          />
        </TouchableOpacity>
      </View>
      
      {/* Password Strength Indicator */}
      {showStrengthIndicator && value && passwordStrength && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBar}>
            {[1, 2, 3, 4, 5].map((level) => (
              <View
                key={level}
                style={[
                  styles.strengthSegment,
                  {
                    backgroundColor: level <= passwordStrength.score
                      ? getStrengthColor(passwordStrength.strength)
                      : themeColors.border.secondary,
                  }
                ]}
              />
            ))}
          </View>
          <Text style={[
            styles.strengthText,
            { color: getStrengthColor(passwordStrength.strength) }
          ]}>
            {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
          </Text>
        </View>
      )}
      
      {/* Error Message */}
      {error && (
        <Text style={[styles.errorText, { color: themeColors.status.error }]}>
          {error}
        </Text>
      )}
      
      {/* Password Requirements (when showing strength) */}
      {showStrengthIndicator && value && passwordStrength && passwordStrength.feedback.length > 0 && (
        <View style={styles.requirementsContainer}>
          <Text style={[styles.requirementsTitle, { color: themeColors.text.secondary }]}>
            Password requirements:
          </Text>
          {passwordStrength.feedback.map((feedback, index) => (
            <Text
              key={index}
              style={[styles.requirementText, { color: themeColors.text.tertiary }]}
            >
              • {feedback}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  strengthBar: {
    flexDirection: 'row',
    flex: 1,
    height: 4,
    marginRight: 8,
    gap: 2,
  },
  strengthSegment: {
    flex: 1,
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 50,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  requirementsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 11,
    marginBottom: 2,
  },
});
