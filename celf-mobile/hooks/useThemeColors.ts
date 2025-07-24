import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/design-tokens';

/**
 * Custom hook that returns theme-aware colors
 * Automatically switches between light and dark color variants
 */
export const useThemeColors = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return {
    // Theme info
    theme,
    isDark,
    isLight: !isDark,

    // Background colors
    background: {
      primary: isDark ? Colors.dark.background.primary : Colors.background.primary,
      secondary: isDark ? Colors.dark.background.secondary : Colors.background.secondary,
      tertiary: isDark ? Colors.dark.background.tertiary : Colors.background.tertiary,
    },

    // Text colors
    text: {
      primary: isDark ? Colors.dark.text.primary : Colors.text.primary,
      secondary: isDark ? Colors.dark.text.secondary : Colors.text.secondary,
      tertiary: isDark ? Colors.dark.text.tertiary : Colors.text.tertiary,
      inverse: isDark ? Colors.dark.text.inverse : Colors.text.inverse,
    },

    // Border colors
    border: {
      primary: isDark ? Colors.dark.border.primary : Colors.border.primary,
      secondary: isDark ? Colors.dark.border.secondary : Colors.border.secondary,
    },

    // Icon colors (theme-aware)
    icon: {
      primary: isDark ? Colors.dark.icon.primary : Colors.icon.primary,
      secondary: isDark ? Colors.dark.icon.secondary : Colors.icon.secondary,
      tertiary: isDark ? Colors.dark.icon.tertiary : Colors.icon.tertiary,
      accent: Colors.icon.accent, // Accent stays the same in both themes
      inverse: isDark ? Colors.dark.icon.inverse : Colors.icon.inverse,
      success: Colors.icon.success, // Status colors stay the same
      error: Colors.icon.error,
      warning: Colors.icon.warning,
    },

    // Primary colors (stay the same in both themes)
    primary: Colors.primary,
    accent: Colors.accent,
    status: Colors.status,

    // Card colors
    card: {
      background: isDark ? Colors.dark.background.primary : Colors.background.primary,
      elevated: isDark ? Colors.dark.background.secondary : Colors.background.primary,
    },

    // Status bar style
    statusBar: isDark ? 'light-content' : 'dark-content',
  };
};
