/**
 * Auth Store - Zustand
 * Manages user authentication state and actions
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureOnlyStorage } from '@/utils/storage';
import { apiService, User } from '@/services/apiService';

interface AuthState {
  // User state
  user: User | null;
  isSignedIn: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { firstName?: string; lastName?: string; email?: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isSignedIn: false,
      isLoading: false,
      error: null,

      // Sign in action
      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiService.login(email, password);
          
          if (response.success && response.data) {
            set({
              user: response.data.user,
              isSignedIn: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
          throw error;
        }
      },

      // Sign up action
      signUp: async (email: string, password: string, firstName: string, lastName: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiService.register(email, password, firstName, lastName);
          
          if (response.success) {
            // Registration successful, but user needs to login
            set({
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
          throw error;
        }
      },

      // Sign out action
      signOut: async () => {
        set({ isLoading: true });

        try {
          await apiService.logout();
        } catch (error) {
          console.error('Logout error:', error);
          // Continue with local logout even if API call fails
        }

        set({
          user: null,
          isSignedIn: false,
          isLoading: false,
          error: null,
        });
      },

      // Update profile action
      updateProfile: async (updates: { firstName?: string; lastName?: string; email?: string }) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiService.updateProfile(updates);
          
          if (response.success && response.data) {
            set({
              user: response.data.user,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Profile update failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Profile update failed',
          });
          throw error;
        }
      },

      // Change password action
      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiService.changePassword(currentPassword, newPassword);
          
          if (response.success) {
            set({
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Password change failed');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Password change failed',
          });
          throw error;
        }
      },

      // Clear error action
      clearError: () => {
        set({ error: null });
      },

      // Check authentication status (on app start)
      checkAuthStatus: async () => {
        set({ isLoading: true });

        try {
          const token = await apiService.getToken();
          
          if (token) {
            // Try to get user profile to verify token is still valid
            const response = await apiService.getProfile();
            
            if (response.success && response.data) {
              set({
                user: response.data.user,
                isSignedIn: true,
                isLoading: false,
                error: null,
              });
            } else {
              // Token is invalid, clear it
              await apiService.clearTokens();
              set({
                user: null,
                isSignedIn: false,
                isLoading: false,
                error: null,
              });
            }
          } else {
            set({
              user: null,
              isSignedIn: false,
              isLoading: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Clear tokens and reset state
          await apiService.clearTokens();
          set({
            user: null,
            isSignedIn: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Refresh authentication (retry with refresh token)
      refreshAuth: async () => {
        try {
          const refreshed = await apiService.refreshAuthToken();
          
          if (refreshed) {
            // Get updated user profile
            const response = await apiService.getProfile();
            
            if (response.success && response.data) {
              set({
                user: response.data.user,
                isSignedIn: true,
                error: null,
              });
            }
          } else {
            // Refresh failed, sign out
            await get().signOut();
          }
        } catch (error) {
          console.error('Auth refresh failed:', error);
          await get().signOut();
        }
      },
    }),
    {
      name: 'celf-auth-storage',
      storage: createJSONStorage(() => secureOnlyStorage),
      // Only persist user data, not loading states or errors
      partialize: (state) => ({
        user: state.user,
        isSignedIn: state.isSignedIn,
      }),
    }
  )
);
