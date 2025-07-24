import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Components, Spacing } from '@/constants/design-tokens';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: error ? Spacing.xs : Spacing.md,
  });

  const getInputContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: disabled ? Colors.neutral[100] : Colors.background.secondary,
    borderWidth: 1,
    borderColor: error 
      ? Colors.secondary.error 
      : isFocused 
        ? Colors.primary.blue 
        : Colors.border.primary,
    borderRadius: Components.input.borderRadius,
    paddingHorizontal: Components.input.padding.horizontal,
    paddingVertical: multiline ? Components.input.padding.vertical : 0,
    minHeight: multiline ? undefined : Components.input.height,
  });

  const getInputStyle = (): TextStyle => ({
    flex: 1,
    fontSize: Typography.fontSize.bodyMedium,
    color: disabled ? Colors.neutral[500] : Colors.text.primary,
    paddingVertical: multiline ? 0 : Components.input.padding.vertical,
    textAlignVertical: multiline ? 'top' : 'center',
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: Typography.fontSize.bodySmall,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: Typography.fontSize.caption,
    color: Colors.secondary.error,
    marginTop: Spacing.xs,
  });

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setShowPassword(!showPassword);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIconName = () => {
    if (secureTextEntry) {
      return showPassword ? 'eye-off-outline' : 'eye-outline';
    }
    return rightIcon || '';
  };

  return (
    <View style={[getContainerStyle(), style]}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon as any} 
            size={20} 
            color={Colors.neutral[500]} 
            style={{ marginRight: Spacing.sm }}
          />
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[500]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity 
            onPress={handleRightIconPress}
            style={{ marginLeft: Spacing.sm }}
            disabled={!secureTextEntry && !onRightIconPress}
          >
            <Ionicons 
              name={getRightIconName() as any} 
              size={20} 
              color={Colors.neutral[500]} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
};
