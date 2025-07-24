import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'celf_app_theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light'); // Default to light
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme on app start
  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      // Temporarily disable SecureStore to fix the error
      // TODO: Re-enable once expo-secure-store compatibility is resolved
      console.log('Theme loading temporarily disabled');
      // const savedTheme = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
      // if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      //   setThemeState(savedTheme as ThemeMode);
      // }
    } catch (error) {
      console.warn('Failed to load saved theme:', error);
      // Keep default light theme
    } finally {
      setIsLoading(false);
    }
  };

  const saveTheme = async (newTheme: ThemeMode) => {
    try {
      // Temporarily disable SecureStore to fix the error
      // TODO: Re-enable once expo-secure-store compatibility is resolved
      console.log('Theme saving temporarily disabled for:', newTheme);
      // await SecureStore.setItemAsync(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook to get theme-aware colors
export const useThemeColors = () => {
  const { theme } = useTheme();
  
  // This will be expanded when we add dark theme colors
  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};
