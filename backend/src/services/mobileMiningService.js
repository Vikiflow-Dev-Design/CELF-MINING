const supabaseService = require('./supabaseService');
const { v4: uuidv4 } = require('uuid');

class MobileMiningService {
  constructor() {
    // Default fallback values (will be overridden by admin settings)
    this.DEFAULT_MINING_RATE = 0.125; // CELF per hour
    this.DEFAULT_MAX_SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
    this.VALIDATION_TOLERANCE = 0.1; // 10% tolerance for network delays
  }

  /**
   * Get current admin mining settings
   */
  async getAdminMiningSettings() {
    try {
      console.log('Fetching admin mining settings...');
      const settings = await supabaseService.getMiningSettings();
      console.log('Admin settings retrieved:', settings);

      const adminSettings = {
        miningRate: settings.defaultMiningRate || this.DEFAULT_MINING_RATE,
        maxSessionTimeMs: (settings.maxSessionTime || 86400) * 1000, // Convert seconds to ms
        miningSpeed: settings.miningSpeed || 1.0,
        rewardMultiplier: settings.rewardMultiplier || 1.0,
        maintenanceMode: settings.maintenanceMode || false,
        minTokensToMine: settings.minTokensToMine || 0.01,
        maxTokensPerSession: settings.maxTokensPerSession || 100,
        cooldownPeriod: settings.cooldownPeriod || 0,
        dailyLimit: settings.dailyLimit || 1000,
        referralBonus: settings.referralBonus || 0.1,
        autoClaim: settings.autoClaim !== undefined ? settings.autoClaim : true,
        notificationEnabled: settings.notificationEnabled !== undefined ? settings.notificationEnabled : true
      };

      console.log('Processed admin settings:', adminSettings);
      return adminSettings;
    } catch (error) {
      console.error('Failed to get admin mining settings, using defaults:', error);
      console.log('Using default settings due to error');

      const defaultSettings = {
        miningRate: this.DEFAULT_MINING_RATE,
        maxSessionTimeMs: this.DEFAULT_MAX_SESSION_DURATION_MS,
        miningSpeed: 1.0,
        rewardMultiplier: 1.0,
        maintenanceMode: false,
        minTokensToMine: 0.01,
        maxTokensPerSession: 100
      };

      console.log('Default settings:', defaultSettings);
      return defaultSettings;
    }
  }

  /**
   * Start a new mining session
   * @param {string} userId - User ID
   * @param {object} deviceInfo - Device information
   * @returns {Promise<object>} Session data
   */
  async startMiningSession(userId, deviceInfo = {}) {
    try {
      // Get current admin settings
      const adminSettings = await this.getAdminMiningSettings();

      // Check if mining is in maintenance mode
      if (adminSettings.maintenanceMode) {
        throw new Error('Mining is currently in maintenance mode. Please try again later.');
      }

      // Check if user already has an active session
      const existingSession = await supabaseService.findActiveMiningSession(userId);

      if (existingSession) {
        // Check if existing session is expired using admin-configured max time
        const sessionAge = new Date() - new Date(existingSession.started_at);
        if (sessionAge >= adminSettings.maxSessionTimeMs) {
          await this.completeExpiredSession(existingSession.id);
        } else {
          throw new Error('User already has an active mining session');
        }
      }

      // Create new session with admin-configured settings
      const sessionId = uuidv4();
      const effectiveMiningRate = adminSettings.miningRate * adminSettings.miningSpeed * adminSettings.rewardMultiplier;

      const sessionData = {
        user_id: userId,
        session_id: sessionId,
        status: 'active',
        mining_rate: effectiveMiningRate,
        max_duration_ms: adminSettings.maxSessionTimeMs,
        remaining_time_ms: adminSettings.maxSessionTimeMs,
        started_at: new Date().toISOString(),
        device_info: {
          deviceId: deviceInfo.deviceId || 'unknown',
          platform: deviceInfo.platform || 'unknown',
          appVersion: deviceInfo.appVersion || 'unknown',
          osVersion: deviceInfo.osVersion || 'unknown'
        },
        validation_data: {
          last_validated_at: new Date().toISOString(),
          validation_count: 0,
          suspicious_activity: false,
          flagged_reasons: []
        },
        server_time: new Date().toISOString()
      };

      const session = await supabaseService.createMiningSession(sessionData);

      return {
        sessionId: session.session_id,
        startTime: session.started_at,
        miningRate: session.mining_rate,
        maxDurationMs: session.max_duration_ms,
        serverTime: session.server_time
      };
    } catch (error) {
      console.error('Error starting mining session:', error);
      throw error;
    }
  }

  /**
   * Complete a mining session and sync rewards to wallet
   * @param {string} sessionId - Session ID
   * @param {object} clientData - Client-reported data for validation
   * @returns {Promise<object>} Completion result
   */
  async completeMiningSession(sessionId, clientData = {}) {
    try {
      const session = await supabaseService.findOne('mining_sessions', { session_id: sessionId });

      if (!session) {
        throw new Error('Mining session not found');
      }

      if (session.status !== 'active') {
        throw new Error('Session is not active');
      }

      // Get current admin settings for validation
      const adminSettings = await this.getAdminMiningSettings();

      // Calculate server-side earnings (authoritative)
      let serverEarnings = await this.calculateServerEarnings(session);

      // Check if session exceeds admin-configured max tokens per session
      if (serverEarnings > adminSettings.maxTokensPerSession) {
        console.warn(`Session ${sessionId} exceeded max tokens per session: ${serverEarnings} > ${adminSettings.maxTokensPerSession}`);
        // Cap the earnings to the maximum allowed
        serverEarnings = adminSettings.maxTokensPerSession;
      }
      const actualDurationMs = Math.min(
        new Date() - new Date(session.started_at),
        session.max_duration_ms
      );

      // Validate client data if provided
      if (clientData.reportedEarnings) {
        const isValid = this.validateClientEarnings(
          serverEarnings,
          clientData.reportedEarnings
        );

        if (!isValid) {
          await this.flagSuspiciousActivity(session.id, 'Invalid earnings reported');
          console.warn(`Suspicious activity detected for session ${sessionId}`);
        }
      }

      // Complete the session
      const completedAt = new Date().toISOString();
      const updatedSession = await supabaseService.update('mining_sessions', session.id, {
        status: 'completed',
        completed_at: completedAt,
        tokens_earned: serverEarnings,
        runtime_seconds: Math.floor(actualDurationMs / 1000),
        completion_data: {
          final_earnings: serverEarnings,
          actual_duration_ms: actualDurationMs,
          completed_at: completedAt,
          synced_to_wallet: false,
          transaction_id: null
        }
      });

      // Add mining rewards to user wallet
      const walletResult = await this.addMiningRewardsToWallet(
        session.user_id,
        serverEarnings,
        session.id
      );

      // Update session with transaction info
      await supabaseService.update('mining_sessions', session.id, {
        completion_data: {
          ...updatedSession.completion_data,
          synced_to_wallet: true,
          transaction_id: walletResult.transactionId
        }
      });

      return {
        sessionId: session.session_id,
        finalEarnings: serverEarnings,
        actualDurationMs,
        completedAt,
        transactionId: walletResult.transactionId,
        newWalletBalance: walletResult.newBalance
      };
    } catch (error) {
      console.error('Error completing mining session:', error);
      throw error;
    }
  }

  /**
   * Get current session status
   * @param {string} userId - User ID
   * @returns {Promise<object|null>} Current session or null
   */
  async getCurrentSession(userId) {
    try {
      const session = await supabaseService.findActiveMiningSession(userId);

      if (!session) {
        return null;
      }

      // Check if session is expired
      const sessionAge = new Date() - new Date(session.started_at);
      if (sessionAge >= this.MAX_SESSION_DURATION_MS) {
        await this.completeExpiredSession(session.id);
        return null;
      }

      // Calculate current earnings and remaining time
      const currentEarnings = await this.calculateServerEarnings(session);
      const remainingTimeMs = Math.max(0, session.max_duration_ms - sessionAge);
      const progress = Math.min(100, (sessionAge / session.max_duration_ms) * 100);

      return {
        sessionId: session.session_id,
        startTime: session.started_at,
        miningRate: session.mining_rate,
        currentEarnings,
        remainingTimeMs,
        progress,
        serverTime: new Date()
      };
    } catch (error) {
      console.error('Error getting current session:', error);
      throw error;
    }
  }

  /**
   * Cancel an active mining session
   * @param {string} sessionId - Session ID
   * @returns {Promise<object>} Cancellation result
   */
  async cancelMiningSession(sessionId) {
    try {
      const session = await supabaseService.findOne('mining_sessions', { session_id: sessionId });

      if (!session) {
        throw new Error('Mining session not found');
      }

      if (session.status !== 'active') {
        throw new Error('Session is not active');
      }

      // Calculate earnings up to cancellation point
      const earningsAtCancellation = await this.calculateServerEarnings(session);
      const cancelledAt = new Date().toISOString();
      const durationMs = new Date() - new Date(session.started_at);

      const updatedSession = await supabaseService.update('mining_sessions', session.id, {
        status: 'cancelled',
        completed_at: cancelledAt,
        tokens_earned: earningsAtCancellation,
        runtime_seconds: Math.floor(durationMs / 1000),
        completion_data: {
          final_earnings: earningsAtCancellation,
          actual_duration_ms: durationMs,
          completed_at: cancelledAt,
          synced_to_wallet: false,
          transaction_id: null
        }
      });

      // Add partial rewards to wallet if any
      if (earningsAtCancellation > 0) {
        await this.addMiningRewardsToWallet(
          session.user_id,
          earningsAtCancellation,
          session.id
        );
      }

      return {
        sessionId: session.session_id,
        status: 'cancelled',
        finalEarnings: earningsAtCancellation,
        cancelledAt
      };
    } catch (error) {
      console.error('Error cancelling mining session:', error);
      throw error;
    }
  }

  /**
   * Validate client-reported earnings against server calculation
   * @param {number} serverEarnings - Server-calculated earnings
   * @param {number} clientEarnings - Client-reported earnings
   * @returns {boolean} Is valid
   */
  validateClientEarnings(serverEarnings, clientEarnings) {
    const tolerance = serverEarnings * this.VALIDATION_TOLERANCE;
    const minValid = serverEarnings - tolerance;
    const maxValid = serverEarnings + tolerance;
    
    return clientEarnings >= minValid && clientEarnings <= maxValid;
  }

  /**
   * Calculate server-side earnings for a session
   * @param {object} session - Mining session record
   * @returns {Promise<number>} Calculated earnings
   */
  async calculateServerEarnings(session) {
    if (session.status !== 'active' || !session.started_at) {
      return session.tokens_earned || 0;
    }

    const elapsedMs = Math.min(
      new Date() - new Date(session.started_at),
      session.max_duration_ms
    );
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    return elapsedHours * session.mining_rate;
  }

  /**
   * Complete an expired session
   * @param {string} sessionId - Session ID
   */
  async completeExpiredSession(sessionId) {
    try {
      const session = await supabaseService.findById('mining_sessions', sessionId);
      if (!session) return;

      const serverEarnings = await this.calculateServerEarnings(session);
      const completedAt = new Date().toISOString();

      await supabaseService.update('mining_sessions', sessionId, {
        status: 'expired',
        completed_at: completedAt,
        tokens_earned: serverEarnings,
        runtime_seconds: 86400, // 24 hours
        completion_data: {
          final_earnings: serverEarnings,
          actual_duration_ms: this.MAX_SESSION_DURATION_MS,
          completed_at: completedAt,
          synced_to_wallet: false,
          transaction_id: null
        }
      });

      // Add rewards to wallet
      await this.addMiningRewardsToWallet(session.user_id, serverEarnings, sessionId);
    } catch (error) {
      console.error('Error completing expired session:', error);
    }
  }

  /**
   * Flag suspicious activity for a session
   * @param {string} sessionId - Session ID
   * @param {string} reason - Reason for flagging
   */
  async flagSuspiciousActivity(sessionId, reason) {
    try {
      const session = await supabaseService.findById('mining_sessions', sessionId);
      if (!session) return;

      const validationData = session.validation_data || {};
      validationData.suspicious_activity = true;
      validationData.flagged_reasons = validationData.flagged_reasons || [];
      validationData.flagged_reasons.push(reason);

      await supabaseService.update('mining_sessions', sessionId, {
        validation_data: validationData
      });
    } catch (error) {
      console.error('Error flagging suspicious activity:', error);
    }
  }

  /**
   * Add mining rewards to user wallet
   * @param {string} userId - User ID
   * @param {number} amount - Reward amount
   * @param {string} sessionId - Mining session ID
   * @returns {Promise<object>} Wallet update result
   */
  async addMiningRewardsToWallet(userId, amount, sessionId) {
    try {
      // Get user wallet
      const wallet = await supabaseService.findWalletByUserId(userId);
      if (!wallet) {
        throw new Error('User wallet not found');
      }

      // Add to non-sendable balance (mining rewards are non-transferable)
      const updatedWallet = await supabaseService.update('wallets', wallet.id, {
        non_sendable_balance: wallet.non_sendable_balance + amount,
        total_mined: (wallet.total_mined || 0) + amount,
        last_activity: new Date().toISOString()
      });

      // Create transaction record
      const transactionData = {
        to_user_id: userId,
        amount,
        type: 'mining',
        status: 'completed',
        description: 'Mobile mining reward',
        session_id: sessionId,
        mining_rate: this.FIXED_MINING_RATE,
        processed_at: new Date().toISOString()
      };

      const transaction = await supabaseService.createTransaction(transactionData);

      return {
        transactionId: transaction.id,
        newBalance: {
          total: updatedWallet.total_balance,
          nonSendable: updatedWallet.non_sendable_balance,
          sendable: updatedWallet.sendable_balance,
          pending: updatedWallet.pending_balance
        }
      };
    } catch (error) {
      console.error('Error adding mining rewards to wallet:', error);
      throw error;
    }
  }

  /**
   * Get user mining statistics
   * @param {string} userId - User ID
   * @returns {Promise<object>} Mining statistics
   */
  async getUserMiningStats(userId) {
    try {
      const sessions = await supabaseService.findMiningSessionsByUser(userId);

      const stats = {
        totalSessions: sessions.length,
        completedSessions: sessions.filter(s => s.status === 'completed' || s.status === 'expired').length,
        totalEarnings: sessions.reduce((sum, s) => sum + parseFloat(s.tokens_earned || 0), 0),
        totalMiningTime: sessions.reduce((sum, s) => sum + (s.runtime_seconds || 0) * 1000, 0), // Convert to ms
        averageSessionDuration: 0,
        lastMiningSession: null
      };

      if (stats.completedSessions > 0) {
        stats.averageSessionDuration = stats.totalMiningTime / stats.completedSessions;
      }

      const lastSession = sessions
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

      if (lastSession) {
        stats.lastMiningSession = {
          sessionId: lastSession.session_id,
          status: lastSession.status,
          startTime: lastSession.started_at,
          endTime: lastSession.completed_at,
          earnings: parseFloat(lastSession.tokens_earned || 0)
        };
      }

      return stats;
    } catch (error) {
      console.error('Error getting user mining stats:', error);
      throw error;
    }
  }

  /**
   * Clean up expired sessions (run periodically)
   */
  async cleanupExpiredSessions() {
    try {
      // Use the SQL function we created in the migration
      const client = supabaseService.getClient();
      const { error } = await client.rpc('auto_complete_expired_mining_sessions');

      if (error) {
        throw new Error(`Error running cleanup function: ${error.message}`);
      }

      // Get count of expired sessions that were just completed
      const expiredSessions = await supabaseService.find('mining_sessions', {
        status: 'expired'
      }, {
        orderBy: { column: 'updated_at', ascending: false },
        limit: 100
      });

      const recentlyExpired = expiredSessions.filter(session => {
        const updatedAt = new Date(session.updated_at);
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        return updatedAt > fiveMinutesAgo;
      });

      console.log(`Auto-completed ${recentlyExpired.length} expired sessions`);
      return recentlyExpired.length;
    } catch (error) {
      console.error('Error cleaning up expired sessions:', error);
      throw error;
    }
  }
}

module.exports = new MobileMiningService();
