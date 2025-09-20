/**
 * API Service for CELF Mobile App
 * Handles all HTTP requests to the backend
 */

import { secureOnlyStorage } from '@/utils/storage';

// Configuration
const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'  // Development - Expo Web, iOS Simulator
  // ? 'http://10.0.2.2:5000/api'  // Development - Android Emulator
  // ? 'http://YOUR_COMPUTER_IP:5000/api'  // Development - Physical Device
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

export interface Transaction {
  id: string;
  fromUserId?: string;
  toUserId?: string;
  toAddress?: string;
  amount: number;
  type: 'send' | 'receive' | 'mining' | 'referral' | 'exchange' | 'bonus';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  hash?: string;
  fee?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserSearchResult {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  walletAddress: string | null;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  walletAddress: string;
}

export interface MiningStatus {
  isActive: boolean;
  currentRate: number;
  tokensEarned: number;
  runtime: number;
  status: string;
}

export interface UserSearchResult {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  walletAddress?: string;
}

export interface AddressValidationResult {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  walletAddress: string;
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
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000), // 30 second timeout
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
          const retryData = await retryResponse.json();

          if (!retryResponse.ok) {
            throw new Error(retryData.message || `HTTP error! status: ${retryResponse.status}`);
          }

          return retryData;
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

      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Network error: Unable to connect to server. Please check your connection and ensure the backend is running.');
        } else if (error.message.includes('JSON')) {
          throw new Error('Server response error: Invalid response format. Please try again.');
        }
      }

      throw error;
    }
  }

  // Authentication endpoints
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    referralCode?: string
  ): Promise<ApiResponse<{
    user: User;
    referral?: {
      processed: boolean;
      bonus: number;
    };
  }>> {
    const body: any = { email, password, firstName, lastName };
    if (referralCode) {
      body.referralCode = referralCode;
    }

    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
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

  // User search endpoints
  async searchUsers(query: string, limit: number = 10): Promise<ApiResponse<UserSearchResult[]>> {
    // Use the authenticated endpoint with correct parameter name
    const endpoint = `/users/search?q=${encodeURIComponent(query)}&limit=${limit}`;
    console.log('🔍 ApiService: Making search request to:', `${this.baseURL}${endpoint}`);

    try {
      const response = await this.request(endpoint);
      console.log('📡 ApiService: Search response received:', response);
      return response;
    } catch (error) {
      console.error('❌ ApiService: Search request failed:', error);
      throw error;
    }
  }

  async validateAddress(address: string): Promise<ApiResponse<AddressValidationResult>> {
    return this.request('/users/validate-address', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  // Wallet endpoints
  async getWalletBalance(): Promise<ApiResponse<WalletBalance>> {
    return this.request('/wallet/balance');
  }

  async getTransactions(page: number = 1, limit: number = 20): Promise<ApiResponse<{
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> {
    return this.request(`/wallet/transactions?page=${page}&limit=${limit}`);
  }

  async getTransactionById(id: string): Promise<ApiResponse<Transaction>> {
    return this.request(`/wallet/transactions/${id}`);
  }

  async exchangeTokens(
    amount: number,
    fromType: 'sendable' | 'nonSendable',
    toType: 'sendable' | 'nonSendable'
  ): Promise<ApiResponse<{
    newBalance: {
      sendable: number;
      nonSendable: number;
      total: number;
    }
  }>> {
    return this.request('/wallet/exchange', {
      method: 'POST',
      body: JSON.stringify({ amount, fromType, toType }),
    });
  }

  async getExchangeRates(): Promise<ApiResponse<{
    rates: {
      CELF_USD: number;
      sendableToNonSendable: number;
      nonSendableToSendable: number;
    }
  }>> {
    return this.request('/wallet/exchange/rates');
  }

  async sendTokens(
    toAddress: string,
    amount: number,
    description?: string
  ): Promise<ApiResponse<Transaction & { recipient?: { name: string; address: string } }>> {
    console.log('🚀 ApiService: Sending tokens...', { toAddress, amount, description });

    // Check if we have a token
    const token = await this.getToken();
    console.log('🔑 ApiService: Current token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');

    if (!token) {
      console.error('❌ ApiService: No authentication token available');
      throw new Error('Authentication required. Please login first.');
    }

    try {
      console.log('📡 ApiService: Making request to /wallet/send...');
      const response = await this.request('/wallet/send', {
        method: 'POST',
        body: JSON.stringify({ toAddress, amount, description }),
      });

      console.log('✅ ApiService: Send tokens response:', response);
      return response;
    } catch (error) {
      console.error('❌ ApiService: Send tokens failed:', error);

      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          throw new Error('Authentication failed. Please login again.');
        } else if (error.message.includes('400')) {
          throw new Error('Invalid request. Please check the recipient address and amount.');
        } else if (error.message.includes('500')) {
          throw new Error('Server error. Please try again later.');
        }
      }

      throw error;
    }
  }


  async sendTokensByEmail(
    toEmail: string,
    amount: number,
    description?: string
  ): Promise<ApiResponse<Transaction & { recipient?: { name: string; email: string } }>> {
    console.log('🚀 ApiService: Sending tokens by email...', { toEmail, amount, description });

    // Check if we have a token
    const token = await this.getToken();
    console.log('🔑 ApiService: Current token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');

    if (!token) {
      console.error('❌ ApiService: No authentication token available');
      throw new Error('Authentication required. Please login first.');
    }

    try {
      console.log('📡 ApiService: Making request to /wallet/send-by-email...');
      console.log('📡 ApiService: Request payload:', { toEmail, amount, description });

      const response = await this.request('/wallet/send-by-email', {
        method: 'POST',
        body: JSON.stringify({ toEmail, amount, description }),
      });

      console.log('✅ ApiService: Send tokens by email response received');
      console.log('✅ ApiService: Response details:', {
        success: response.success,
        message: response.message,
        hasData: !!response.data,
        dataKeys: response.data ? Object.keys(response.data) : [],
        timestamp: response.timestamp
      });

      if (response.data) {
        console.log('✅ ApiService: Transaction data:', {
          transactionId: response.data.transaction?.id,
          recipientName: response.data.recipient?.name,
          recipientEmail: response.data.recipient?.email
        });
      }

      return response;
    } catch (error) {
      console.error('❌ ApiService: Send tokens by email failed:', error);

      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          throw new Error('Authentication failed. Please login again.');
        } else if (error.message.includes('400')) {
          throw new Error('Invalid request. Please check the recipient email and amount.');
        } else if (error.message.includes('404')) {
          throw new Error('Recipient not found. Please check the email address.');
        } else if (error.message.includes('500')) {
          throw new Error('Server error. Please try again later.');
        }
      }

      throw error;
    }
  }

  async validateAddress(address: string): Promise<ApiResponse<UserInfo>> {
    return this.request(`/users/validate-address/${address}`);
  }

  async getUserByAddress(address: string): Promise<ApiResponse<UserInfo>> {
    return this.request(`/users/by-address/${address}`);
  }

  // Mining endpoints
  async getMiningStatus(): Promise<ApiResponse<MiningStatus>> {
    return this.request('/mining/status');
  }

  async startMining(deviceInfo?: any): Promise<ApiResponse> {
    return this.request('/mining/start', {
      method: 'POST',
      body: JSON.stringify({
        deviceInfo: deviceInfo || {}
      }),
    });
  }

  async stopMining(sessionId?: string, clientData?: any): Promise<ApiResponse> {
    return this.request('/mining/stop', {
      method: 'POST',
      body: JSON.stringify({ sessionId, clientData }),
    });
  }

  async cancelMining(sessionId?: string): Promise<ApiResponse> {
    return this.request('/mining/cancel', {
      method: 'POST',
      body: JSON.stringify({ sessionId }),
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

  async getMiningRate(): Promise<ApiResponse<{
    rate: {
      currentRate: number;
      baseRate: number;
      speedMultiplier: number;
      rewardMultiplier: number;
      maxSessionTime: number;
      maintenanceMode: boolean;
      minTokensToMine: number;
      maxTokensPerSession: number;
      cooldownPeriod: number;
      dailyLimit: number;
      referralBonus: number;
      autoClaim: boolean;
      notificationEnabled: boolean;
    }
  }>> {
    return this.request('/mining/rate');
  }

  // Referral endpoints
  async getReferralInfo(): Promise<ApiResponse<{
    referralCode: string;
    referralLink: string;
    stats: {
      total: number;
      pending: number;
      completed: number;
      rewarded: number;
      totalEarned: number;
    };
    referrals: Array<{
      id: string;
      referee: {
        name: string;
        email: string;
      };
      status: string;
      reward: number;
      date: string;
    }>;
  }>> {
    return this.request('/referrals/info');
  }

  async validateReferralCode(code: string): Promise<ApiResponse<{
    valid: boolean;
    referrer?: {
      name: string;
      email: string;
    };
  }>> {
    return this.request(`/referrals/validate/${encodeURIComponent(code)}`);
  }

  async getReferralHistory(page: number = 1, limit: number = 20): Promise<ApiResponse<{
    referrals: Array<{
      id: string;
      referee: {
        name: string;
        email: string;
        joinDate: string;
      };
      status: string;
      reward: number;
      rewardGiven: boolean;
      signupDate: string;
      source: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> {
    return this.request(`/referrals/history?page=${page}&limit=${limit}`);
  }

  async getReferralLeaderboard(limit: number = 10): Promise<ApiResponse<{
    leaderboard: Array<{
      rank: number;
      name: string;
      referrals: number;
      earned: number;
    }>;
  }>> {
    return this.request(`/referrals/leaderboard?limit=${limit}`);
  }

  async generateReferralCode(): Promise<ApiResponse<{
    referralCode: string;
    referralLink: string;
  }>> {
    return this.request('/referrals/generate-code', {
      method: 'POST',
    });
  }



  // Tasks endpoints
  async getTasks(category?: string, completed?: boolean): Promise<ApiResponse<{
    tasks: any[];
    stats: {
      totalTasks: number;
      completedTasks: number;
      completionPercentage: number;
      unclaimedRewards: number;
      totalUnclaimedRewardValue: number;
    };
    categories: Array<{
      key: string;
      label: string;
      icon: string;
      color: string;
    }>;
  }>> {
    let endpoint = '/tasks';
    const params = new URLSearchParams();

    if (category && category !== 'all') {
      params.append('category', category);
    }

    if (completed !== undefined) {
      params.append('completed', completed.toString());
    }

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    return this.request(endpoint);
  }

  async getTaskDetails(taskId: string): Promise<ApiResponse<any>> {
    return this.request(`/tasks/${taskId}`);
  }

  async claimTaskReward(taskId: string): Promise<ApiResponse<{
    success: boolean;
    reward: number;
    message: string;
  }>> {
    return this.request(`/tasks/${taskId}/claim`, {
      method: 'POST',
    });
  }

  async getTaskStats(): Promise<ApiResponse<{
    totalTasks: number;
    completedTasks: number;
    completionPercentage: number;
    unclaimedRewards: number;
    totalUnclaimedRewardValue: number;
  }>> {
    return this.request('/tasks/stats');
  }

  async initializeTasks(): Promise<ApiResponse<{
    initializedCount: number;
  }>> {
    return this.request('/tasks/initialize', {
      method: 'POST',
    });
  }

  // Profile endpoints
  async getProfile(): Promise<ApiResponse<{
    profilePicture: string | null;
    username: string;
    displayName: string;
    bio: string;
    email: string;
    phone: string;
    country: string;
    joinDate: string;
    totalMined: number;
    referrals: number;
    isProfileComplete: boolean;
    userId: string;
    firstName: string;
    lastName: string;
  }>> {
    return this.request('/profile');
  }

  async updateProfile(profileData: {
    username?: string;
    displayName?: string;
    bio?: string;
    phone?: string;
    country?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async uploadProfilePicture(imageUrl: string): Promise<ApiResponse<{
    profilePicture: string;
  }>> {
    return this.request('/profile/picture', {
      method: 'POST',
      body: JSON.stringify({ imageUrl }),
    });
  }

  async getProfileCompletion(): Promise<ApiResponse<{
    isComplete: boolean;
    completionPercentage: number;
    completedCount: number;
    totalCount: number;
    fields: Array<{
      field: string;
      label: string;
      completed: boolean;
    }>;
  }>> {
    return this.request('/profile/completion');
  }

  async searchUserProfiles(query: string, limit?: number): Promise<ApiResponse<{
    users: Array<{
      userId: string;
      username: string;
      displayName: string;
      profilePicture: string | null;
    }>;
    query: string;
    count: number;
  }>> {
    const params = new URLSearchParams({ q: query });
    if (limit) params.append('limit', limit.toString());

    return this.request(`/profile/search?${params.toString()}`);
  }

  async getUserProfile(userId: string): Promise<ApiResponse<{
    userId: string;
    username: string;
    displayName: string;
    bio: string;
    profilePicture: string | null;
    joinDate: string;
    totalMined: number;
    referrals: number;
  }>> {
    return this.request(`/profile/user/${userId}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health', { method: 'GET' });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
