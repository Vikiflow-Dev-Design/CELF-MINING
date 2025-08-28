const mongodbService = require('./mongodbService');
const MobileMiningSession = require('../models/MobileMiningSession');
const { v4: uuidv4 } = require('uuid');

class MobileMiningService {
  constructor() {
    // Default fallback values (will be overridden by admin settings)
    this.DEFAULT_MINING_RATE_PER_SECOND = 0.000278; // CELF per second (1 CELF/hour)
    this.DEFAULT_MINING_INTERVAL_MS = 1000; // Mine every 1 second
    this.DEFAULT_MAX_SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
    this.VALIDATION_TOLERANCE = 0.1; // 10% tolerance for network delays

    // Auto-complete expired sessions every 5 minutes
    this.startAutoCompletionTimer();
  }

  /**
   * Start timer to auto-complete expired sessions
   */
  startAutoCompletionTimer() {
    setInterval(async () => {
      try {
        const completedSessions = await MobileMiningSession.autoCompleteExpiredSessions();
        if (completedSessions.length > 0) {
          console.log(`⏰ Auto-completed ${completedSessions.length} expired mining sessions`);

          // Add rewards to wallets for auto-completed sessions
          for (const sessionResult of completedSessions) {
            try {
              await this.addMiningRewardsToWallet(
                sessionResult.userId,
                sessionResult.finalEarnings,
                sessionResult.sessionId
              );
            } catch (error) {
              console.error(`Failed to add rewards for auto-completed session ${sessionResult.sessionId}:`, error);
            }
          }
        }
      } catch (error) {
        console.error('Error in auto-completion timer:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Get current admin mining settings
   */
  async getAdminMiningSettings() {
    try {
      console.log('Fetching admin mining settings...');
      const settings = await mongodbService.getMiningSettings();
      console.log('Admin settings retrieved:', settings);

      const adminSettings = {
        miningRatePerSecond: settings.miningRatePerSecond || this.DEFAULT_MINING_RATE_PER_SECOND,
        miningIntervalMs: settings.miningIntervalMs || this.DEFAULT_MINING_INTERVAL_MS,
        maxSessionTimeMs: (settings.maxSessionTime || 86400) * 1000, // Convert seconds to ms
        maintenanceMode: settings.maintenanceMode || false,
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
        miningRatePerSecond: this.DEFAULT_MINING_RATE_PER_SECOND,
        miningIntervalMs: this.DEFAULT_MINING_INTERVAL_MS,
        maxSessionTimeMs: this.DEFAULT_MAX_SESSION_DURATION_MS,
        maintenanceMode: false
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
      const existingSession = await MobileMiningSession.findOne({
        userId: userId,
        status: 'active'
      });

      if (existingSession) {
        // Check if existing session is expired using admin-configured max time
        const sessionAge = new Date() - new Date(existingSession.startedAt);
        if (sessionAge >= adminSettings.maxSessionTimeMs) {
          await existingSession.completeSession('auto_completed');
          console.log('✅ Expired session auto-completed');
        } else {
          throw new Error('User already has an active mining session');
        }
      }

      // Create new session with admin-configured settings
      const sessionId = uuidv4();
      const miningRatePerSecond = adminSettings.miningRatePerSecond;
      const miningIntervalMs = adminSettings.miningIntervalMs;

      const sessionData = {
        name: `Mining Session ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`,
        description: `Server-authoritative mobile mining session on ${deviceInfo.platform || 'unknown'}`,
        userId: userId,
        session_id: sessionId,
        status: 'active',
        miningRatePerSecond: miningRatePerSecond,
        miningIntervalMs: miningIntervalMs,
        tokensEarned: 0, // Will be calculated server-side at completion
        max_duration_ms: adminSettings.maxSessionTimeMs,
        remaining_time_ms: adminSettings.maxSessionTimeMs,
        device_info: {
          deviceId: deviceInfo.deviceId || 'unknown',
          platform: deviceInfo.platform || 'unknown',
          appVersion: deviceInfo.appVersion || 'unknown',
          osVersion: deviceInfo.osVersion || 'unknown'
        },
        validation_data: {
          last_validated_at: new Date(),
          validation_count: 0,
          suspicious_activity: false,
          flagged_reasons: [],
          validation_tolerance: this.VALIDATION_TOLERANCE
        },
        startedAt: new Date(),
        server_time: new Date()
      };

      const session = await MobileMiningSession.create(sessionData);
      console.log('✅ Server-authoritative mining session created:', session.session_id);
      console.log(`📊 Session will run for ${adminSettings.maxSessionTimeMs / 1000 / 3600} hours`);
      console.log(`💰 Expected max earnings: ${session.calculateServerEarnings().toFixed(6)} CELF`);

      return {
        sessionId: session.session_id,
        startTime: session.startedAt,
        miningRatePerSecond: session.miningRatePerSecond,
        miningIntervalMs: session.miningIntervalMs,
        maxDurationMs: session.max_duration_ms,
        serverTime: session.server_time,
        estimatedMaxEarnings: session.calculateServerEarnings() // For client UI estimation
      };
    } catch (error) {
      console.error('Error starting mining session:', error);
      throw error;
    }
  }

  /**
   * Complete a mining session with server-authoritative calculation
   * @param {string} sessionId - Session ID
   * @param {object} clientData - Client-reported data for validation
   * @returns {Promise<object>} Completion result
   */
  async completeMiningSession(sessionId, clientData = {}) {
    try {
      console.log(`🏁 Completing server-authoritative mining session: ${sessionId}`);

      const session = await MobileMiningSession.findOne({ session_id: sessionId });

      if (!session) {
        throw new Error('Mining session not found');
      }

      if (session.status !== 'active') {
        throw new Error('Session is not active');
      }

      // Complete session using the model's server-authoritative method
      await session.completeSession('user_stopped', clientData.reportedEarnings);

      console.log(`💰 Server calculated earnings: ${session.tokensEarned.toFixed(6)} CELF`);
      console.log(`⏱️ Session duration: ${session.completion_data.session_duration_ms / 1000} seconds`);
      console.log(`🔢 Completed intervals: ${session.completion_data.completed_intervals}`);

      // Add mining rewards to user wallet (non-transferable)
      const walletResult = await this.addMiningRewardsToWallet(
        session.userId,
        session.tokensEarned,
        session.id
      );

      // Update session with transaction info
      await mongodbService.update('MiningSession', session.id, {
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
      const session = await MobileMiningSession.findOne({
        userId: userId,
        status: 'active'
      });

      if (!session) {
        return null;
      }

      // Check if session is expired and auto-complete if needed
      const sessionAge = new Date() - new Date(session.startedAt);
      if (sessionAge >= session.max_duration_ms) {
        await session.completeSession('auto_completed');
        console.log('✅ Session auto-completed during status check');

        // Add rewards to wallet
        await this.addMiningRewardsToWallet(
          session.userId,
          session.tokensEarned,
          session.session_id
        );

        return null; // Session completed
      }

      // Calculate current server-authoritative earnings
      const currentEarnings = session.calculateServerEarnings();
      const remainingTimeMs = Math.max(0, session.max_duration_ms - sessionAge);
      const progress = Math.min(100, (sessionAge / session.max_duration_ms) * 100);

      return {
        sessionId: session.session_id,
        startTime: session.startedAt,
        miningRatePerSecond: session.miningRatePerSecond,
        miningIntervalMs: session.miningIntervalMs,
        maxDurationMs: session.max_duration_ms,
        currentEarnings, // Server-calculated current earnings
        remainingTimeMs,
        progress,
        serverTime: new Date(),
        isActive: true
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
      const session = await mongodbService.findOne('MiningSession', { session_id: sessionId });

      if (!session) {
        throw new Error('Mining session not found');
      }

      if (session.status !== 'active') {
        throw new Error('Session is not active');
      }

      // Calculate earnings up to cancellation point
      const earningsAtCancellation = await this.calculateServerEarnings(session);
      const cancelledAt = new Date().toISOString();
      const durationMs = new Date() - new Date(session.startedAt);

      const updatedSession = await mongodbService.update('MiningSession', session.id, {
        status: 'cancelled',
        completedAt: cancelledAt,
        tokensEarned: earningsAtCancellation,
        runtimeSeconds: Math.floor(durationMs / 1000),
        completion_data: {
          final_earnings: earningsAtCancellation,
          actual_duration_ms: durationMs,
          completedAt: cancelledAt,
          synced_to_wallet: false,
          transaction_id: null
        }
      });

      // Add partial rewards to wallet if any
      if (earningsAtCancellation > 0) {
        await this.addMiningRewardsToWallet(
          session.userId,
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
   * Calculate server-side earnings for a session using per-second mining
   * @param {object} session - Mining session record
   * @returns {Promise<number>} Calculated earnings
   */
  async calculateServerEarnings(session) {
    if (session.status !== 'active' || !session.startedAt) {
      return session.tokensEarned || 0;
    }

    const elapsedMs = Math.min(
      new Date() - new Date(session.startedAt),
      session.max_duration_ms
    );

    // Calculate based on mining intervals that have completed
    const miningIntervalMs = session.miningIntervalMs || 1000; // Default 1 second
    const completedIntervals = Math.floor(elapsedMs / miningIntervalMs);
    const miningRatePerSecond = session.miningRatePerSecond || 0.000278; // Default rate

    // Calculate earnings: completed intervals * rate per interval
    const intervalRate = miningRatePerSecond * (miningIntervalMs / 1000);
    return completedIntervals * intervalRate;
  }

  /**
   * Complete an expired session
   * @param {string} sessionId - Session ID
   */
  async completeExpiredSession(sessionId) {
    try {
      const session = await mongodbService.findById('MiningSession', sessionId);
      if (!session) return;

      const serverEarnings = await this.calculateServerEarnings(session);
      const completedAt = new Date().toISOString();

      await mongodbService.update('MiningSession', sessionId, {
        status: 'expired',
        completedAt: completedAt,
        tokensEarned: serverEarnings,
        runtimeSeconds: 86400, // 24 hours
        completion_data: {
          final_earnings: serverEarnings,
          actual_duration_ms: this.MAX_SESSION_DURATION_MS,
          completedAt: completedAt,
          synced_to_wallet: false,
          transaction_id: null
        }
      });

      // Add rewards to wallet
      await this.addMiningRewardsToWallet(session.userId, serverEarnings, sessionId);
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
      const session = await mongodbService.findById('MiningSession', sessionId);
      if (!session) return;

      const validationData = session.validation_data || {};
      validationData.suspicious_activity = true;
      validationData.flagged_reasons = validationData.flagged_reasons || [];
      validationData.flagged_reasons.push(reason);

      await mongodbService.update('MiningSession', sessionId, {
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
      const wallet = await mongodbService.findWalletByUserId(userId);
      if (!wallet) {
        throw new Error('User wallet not found');
      }

      // Add to non-sendable balance (mining rewards are non-transferable)
      const updatedWallet = await mongodbService.update('Wallet', wallet.id, {
        non_sendableBalance: wallet.nonSendableBalance + amount,
        totalMined: (wallet.totalMined || 0) + amount,
        lastActivity: new Date().toISOString()
      });

      // Create transaction record
      const transactionData = {
        to_userId: userId,
        amount,
        type: 'mining',
        status: 'completed',
        description: 'Mobile mining reward',
        session_id: sessionId,
        miningRate: this.FIXED_MINING_RATE,
        processedAt: new Date().toISOString()
      };

      const transaction = await mongodbService.createTransaction(transactionData);

      return {
        transactionId: transaction.id,
        newBalance: {
          total: updatedWallet.totalBalance,
          nonSendable: updatedWallet.nonSendableBalance,
          sendable: updatedWallet.sendableBalance,
          pending: updatedWallet.pendingBalance
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
      const sessions = await mongodbService.findMiningSessionsByUser(userId);

      const stats = {
        totalSessions: sessions.length,
        completedSessions: sessions.filter(s => s.status === 'completed' || s.status === 'expired').length,
        totalEarnings: sessions.reduce((sum, s) => sum + parseFloat(s.tokensEarned || 0), 0),
        totalMiningTime: sessions.reduce((sum, s) => sum + (s.runtimeSeconds || 0) * 1000, 0), // Convert to ms
        averageSessionDuration: 0,
        lastMiningSession: null
      };

      if (stats.completedSessions > 0) {
        stats.averageSessionDuration = stats.totalMiningTime / stats.completedSessions;
      }

      const lastSession = sessions
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      if (lastSession) {
        stats.lastMiningSession = {
          sessionId: lastSession.session_id,
          status: lastSession.status,
          startTime: lastSession.startedAt,
          endTime: lastSession.completedAt,
          earnings: parseFloat(lastSession.tokensEarned || 0)
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
      const client = mongodbService.getClient();
      const { error } = await client.rpc('auto_complete_expired_mining_sessions');

      if (error) {
        throw new Error(`Error running cleanup function: ${error.message}`);
      }

      // Get count of expired sessions that were just completed
      const expiredSessions = await mongodbService.find('MiningSession', {
        status: 'expired'
      }, {
        orderBy: { column: 'updatedAt', ascending: false },
        limit: 100
      });

      const recentlyExpired = expiredSessions.filter(session => {
        const updatedAt = new Date(session.updatedAt);
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
