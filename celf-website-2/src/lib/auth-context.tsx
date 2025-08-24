/**
 * Authentication Context for CELF Website
 * Provides authentication state and methods throughout the app
 */

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, tokenManager, User, handleApiError } from '@/src/lib/api';

interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && tokenManager.isAuthenticated();

  /**
   * Initialize authentication state
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('🔐 Initializing authentication...');
      
      if (tokenManager.isAuthenticated()) {
        console.log('✅ Valid token found, fetching user profile...');
        const response = await authApi.getProfile();
        
        if (response.success) {
          setUser(response.data);
          console.log('👤 User authenticated:', response.data.email);
        } else {
          console.log('❌ Failed to fetch user profile');
          tokenManager.clearTokens();
        }
      } else {
        console.log('🚪 No valid token found');
        tokenManager.clearTokens();
      }
    } catch (error) {
      console.error('❌ Auth initialization failed:', error);
      tokenManager.clearTokens();
      setError('Failed to initialize authentication');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login user
   */
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔑 Attempting login for:', email);
      
      const response = await authApi.login({ email, password });
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;
        
        // Store tokens
        tokenManager.setTokens(token, refreshToken);
        
        // Set user state
        setUser(user);
        
        console.log('✅ Login successful:', user.email);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      console.error('❌ Login failed:', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('📝 Attempting registration for:', userData.email);
      
      const response = await authApi.register(userData);
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;
        
        // Store tokens
        tokenManager.setTokens(token, refreshToken);
        
        // Set user state
        setUser(user);
        
        console.log('✅ Registration successful:', user.email);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      console.error('❌ Registration failed:', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      console.log('🚪 Attempting logout...');
      
      // Call backend logout (optional, for logging purposes)
      try {
        await authApi.logout();
      } catch (error) {
        console.warn('⚠️ Backend logout failed, continuing with local logout:', error);
      }
      
      // Clear local state and tokens
      tokenManager.clearTokens();
      setUser(null);
      setError(null);
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Even if logout fails, clear local state
      tokenManager.clearTokens();
      setUser(null);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear error state
   */
  const clearError = (): void => {
    setError(null);
  };

  /**
   * Refresh authentication state
   */
  const refreshAuth = async (): Promise<void> => {
    try {
      console.log('🔄 Refreshing authentication...');
      
      const response = await authApi.refreshToken();
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;
        
        tokenManager.setTokens(token, refreshToken);
        setUser(user);
        
        console.log('✅ Auth refresh successful');
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('❌ Auth refresh failed:', error);
      tokenManager.clearTokens();
      setUser(null);
      setError('Session expired. Please login again.');
    }
  };

  const value: AuthContextType = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    clearError,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

/**
 * Higher-order component for protected routes
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please login to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
