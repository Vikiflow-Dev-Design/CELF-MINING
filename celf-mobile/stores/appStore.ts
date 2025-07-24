/**
 * App Store - Zustand
 * Simplified version for CELF - focuses on navigation and basic UI state
 */

import { create } from 'zustand';

interface AppState {
  // UI state (in-memory only)
  sidebarOpen: boolean;
  isLoading: boolean;

  // Navigation actions
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  // Loading actions
  setLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  // Initial state (in-memory only)
  sidebarOpen: false,
  isLoading: false,

  // Navigation actions
  openSidebar: () => {
    set({ sidebarOpen: true });
  },

  closeSidebar: () => {
    set({ sidebarOpen: false });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  // Loading actions
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));
