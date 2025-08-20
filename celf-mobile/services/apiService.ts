/**
 * API Service for CELF Mobile App
 * Handles all HTTP requests to the backend
 */

import { secureOnlyStorage } from '@/utils/storage';

// Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api'  // Development
  : 'https://your-production-api.com/api'; // Production

const TOKEN_KEY = 'celf_auth_token';
const REFRESH_TOKEN_KEY = 'celf_refresh_token';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface WalletBalance {
  totalBalance: number;
  sendableBalance: number;
  nonSendableBalance: number;
  pendingBalance: number;
  currentAddress: string;
  lastActivity: string;
}

export interface MiningStatus {
  isActive: boolean;
  currentRate: number;
  tokensEarned: number;
  runtime: number;
  status: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Token management
  async getToken(): Promise<string | null> {
    try {
      return await secureOnlyStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async setToken(token: string): Promise<void> {
    try {
      await secureOnlyStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      return await secureOnlyStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  async setRefreshToken(token: string): Promise<void> {
    try {
      await secureOnlyStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  }

  async clearTokens(): Promise<void> {
    try {
      await secureOnlyStorage.removeItem(TOKEN_KEY);
      await secureOnlyStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  // HTTP request helper
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle token expiration
      if (response.status === 401 && data.message?.includes('expired')) {
        const refreshed = await this.refreshAuthToken();
        if (refreshed) {
          // Retry the original request with new token
          const newToken = await this.getToken();
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };
          const retryResponse = await fetch(url, config);
          return await retryResponse.json();
        } else {
          // Refresh failed, clear tokens
          await this.clearTokens();
          throw new Error('Authentication expired. Please login again.');
        }
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);

      // Handle network errors gracefully
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server. Please check your connection and ensure the backend is running.');
      }

      throw error;
    }
  }

  // Authentication endpoints
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<ApiResponse<{ user: User }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
  }

  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store tokens if login successful
    if (response.success && response.data) {
      await this.setToken(response.data.token);
      await this.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.request('/auth/logout', {
      method: 'POST',
    });

    // Clear tokens regardless of response
    await this.clearTokens();

    return response;
  }

  async refreshAuthToken(): Promise<boolean> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await this.request<AuthResponse>('/auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });

      if (response.success && response.data) {
        await this.setToken(response.data.token);
        await this.setRefreshToken(response.data.refreshToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  // User endpoints
  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request('/users/profile');
  }

  async updateProfile(updates: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<ApiResponse<{ user: User }>> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Wallet endpoints
  async getWalletBalance(): Promise<ApiResponse<WalletBalance>> {
    return this.request('/wallet/balance');
  }

  // Mining endpoints
  async getMiningStatus(): Promise<ApiResponse<MiningStatus>> {
    return this.request('/mining/status');
  }

  async startMining(miningRate?: number): Promise<ApiResponse> {
    return this.request('/mining/start', {
      method: 'POST',
      body: JSON.stringify({ miningRate }),
    });
  }

  async stopMining(): Promise<ApiResponse> {
    return this.request('/mining/stop', {
      method: 'POST',
    });
  }

  async pauseMining(): Promise<ApiResponse> {
    return this.request('/mining/pause', {
      method: 'POST',
    });
  }

  async resumeMining(): Promise<ApiResponse> {
    return this.request('/mining/resume', {
      method: 'POST',
    });
  }

  async getMiningSessions(page = 1, limit = 10): Promise<ApiResponse> {
    return this.request(`/mining/sessions?page=${page}&limit=${limit}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health', { method: 'GET' });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
