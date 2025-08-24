const mobileMiningService = require('../services/mobileMiningService');
const { createResponse } = require('../utils/responseUtils');

class MiningController {
  /**
   * Get current mining status for user
   */
  async getMiningStatus(req, res, next) {
    try {
      const userId = req.user.userId;
      console.log('Getting mining status for user:', userId);

      // Use service method directly (more reliable than RPC for now)
      const currentSession = await mobileMiningService.getCurrentSession(userId);

      if (!currentSession) {
        console.log('No active mining session found');
        return res.json(createResponse(true, 'No active mining session', {
          isActive: false,
          currentRate: 0.125,
          tokensEarned: 0,
          runtime: 0,
          status: 'stopped',
          serverTime: new Date()
        }));
      }

      console.log('Found active session:', currentSession);

      // Calculate runtime in seconds
      const runtimeMs = new Date() - new Date(currentSession.startTime);
      const runtimeSeconds = Math.floor(runtimeMs / 1000);

      const status = {
        isActive: true,
        currentRate: currentSession.miningRate,
        tokensEarned: currentSession.currentEarnings,
        runtime: runtimeSeconds,
        status: 'active',
        sessionId: currentSession.sessionId,
        remainingTimeMs: currentSession.remainingTimeMs,
        progress: currentSession.progress,
        serverTime: currentSession.serverTime
      };

      console.log('Returning mining status:', status);
      res.json(createResponse(true, 'Mining status retrieved successfully', status));
    } catch (error) {
      console.error('Error getting mining status:', error);
      next(error);
    }
  }

  async getMiningSessions(req, res, next) {
    try {
      // Return mock mining sessions
      const mockSessions = [
        {
          id: '1',
          status: 'completed',
          tokens_earned: 25.5,
          runtime_seconds: 3600,
          started_at: new Date(Date.now() - 86400000).toISOString(),
          completed_at: new Date(Date.now() - 82800000).toISOString()
        },
        {
          id: '2',
          status: 'completed',
          tokens_earned: 18.2,
          runtime_seconds: 2700,
          started_at: new Date(Date.now() - 172800000).toISOString(),
          completed_at: new Date(Date.now() - 170100000).toISOString()
        }
      ];

      res.json(createResponse(true, 'Mining sessions retrieved successfully', {
        sessions: mockSessions,
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          pages: 1
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Start a new mining session
   */
  async startMining(req, res, next) {
    try {
      const userId = req.user.userId;
      const deviceInfo = req.body.deviceInfo || {};

      // Validate mining rate (should be fixed)
      const requestedRate = req.body.miningRate;
      if (requestedRate && requestedRate !== 0.125) {
        return res.status(400).json(createResponse(false, 'Invalid mining rate. Rate is fixed at 0.125 CELF/hour'));
      }

      const sessionData = await mobileMiningService.startMiningSession(userId, deviceInfo);

      res.json(createResponse(true, 'Mining started successfully', {
        session: {
          sessionId: sessionData.sessionId,
          status: 'active',
          miningRate: sessionData.miningRate,
          tokensEarned: 0,
          runtimeSeconds: 0,
          startedAt: sessionData.startTime,
          maxDurationMs: sessionData.maxDurationMs,
          serverTime: sessionData.serverTime
        }
      }));
    } catch (error) {
      console.error('Error starting mining:', error);
      if (error.message.includes('already has an active')) {
        return res.status(400).json(createResponse(false, error.message));
      }
      next(error);
    }
  }

  /**
   * Stop/Complete a mining session
   */
  async stopMining(req, res, next) {
    try {
      const userId = req.user.userId;
      const { sessionId, clientData } = req.body;

      // Get current session if sessionId not provided
      let targetSessionId = sessionId;
      if (!targetSessionId) {
        const currentSession = await mobileMiningService.getCurrentSession(userId);
        if (!currentSession) {
          return res.status(400).json(createResponse(false, 'No active mining session found'));
        }
        targetSessionId = currentSession.sessionId;
      }

      const completionResult = await mobileMiningService.completeMiningSession(targetSessionId, clientData);

      res.json(createResponse(true, 'Mining stopped successfully', {
        session: {
          sessionId: completionResult.sessionId,
          status: 'completed',
          tokensEarned: completionResult.finalEarnings,
          runtimeMs: completionResult.actualDurationMs,
          completedAt: completionResult.completedAt,
          transactionId: completionResult.transactionId,
          newWalletBalance: completionResult.newWalletBalance
        }
      }));
    } catch (error) {
      console.error('Error stopping mining:', error);
      if (error.message.includes('not found') || error.message.includes('not active')) {
        return res.status(400).json(createResponse(false, error.message));
      }
      next(error);
    }
  }

  /**
   * Cancel a mining session
   */
  async cancelMining(req, res, next) {
    try {
      const userId = req.user.userId;
      const { sessionId } = req.body;

      // Get current session if sessionId not provided
      let targetSessionId = sessionId;
      if (!targetSessionId) {
        const currentSession = await mobileMiningService.getCurrentSession(userId);
        if (!currentSession) {
          return res.status(400).json(createResponse(false, 'No active mining session found'));
        }
        targetSessionId = currentSession.sessionId;
      }

      const cancellationResult = await mobileMiningService.cancelMiningSession(targetSessionId);

      res.json(createResponse(true, 'Mining cancelled successfully', {
        session: {
          sessionId: cancellationResult.sessionId,
          status: cancellationResult.status,
          tokensEarned: cancellationResult.finalEarnings,
          cancelledAt: cancellationResult.cancelledAt
        }
      }));
    } catch (error) {
      console.error('Error cancelling mining:', error);
      if (error.message.includes('not found') || error.message.includes('not active')) {
        return res.status(400).json(createResponse(false, error.message));
      }
      next(error);
    }
  }

  /**
   * Pause mining (not supported in mobile app - sessions run for 24 hours)
   */
  async pauseMining(req, res, next) {
    try {
      res.status(400).json(createResponse(false, 'Pause/Resume not supported in mobile mining. Sessions run for 24 hours.'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Resume mining (not supported in mobile app - sessions run for 24 hours)
   */
  async resumeMining(req, res, next) {
    try {
      res.status(400).json(createResponse(false, 'Pause/Resume not supported in mobile mining. Sessions run for 24 hours.'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update mining progress (not needed for mobile app - server calculates everything)
   */
  async updateMiningProgress(req, res, next) {
    try {
      res.status(400).json(createResponse(false, 'Progress updates not supported. Server calculates all progress automatically.'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current mining session
   */
  async getCurrentSession(req, res, next) {
    try {
      const userId = req.user.userId;
      const currentSession = await mobileMiningService.getCurrentSession(userId);

      if (!currentSession) {
        return res.json(createResponse(true, 'No active mining session', { session: null }));
      }

      // Calculate runtime in seconds
      const runtimeMs = new Date() - new Date(currentSession.startTime);
      const runtimeSeconds = Math.floor(runtimeMs / 1000);

      const sessionData = {
        sessionId: currentSession.sessionId,
        status: 'active',
        tokensEarned: currentSession.currentEarnings,
        runtimeSeconds: runtimeSeconds,
        miningRate: currentSession.miningRate,
        startedAt: currentSession.startTime,
        remainingTimeMs: currentSession.remainingTimeMs,
        progress: currentSession.progress,
        serverTime: currentSession.serverTime
      };

      res.json(createResponse(true, 'Current session retrieved successfully', { session: sessionData }));
    } catch (error) {
      console.error('Error getting current session:', error);
      next(error);
    }
  }

  async getMiningSessionById(req, res, next) {
    try {
      const { id } = req.params;

      const mockSession = {
        id,
        status: 'completed',
        tokens_earned: 25.5,
        runtime_seconds: 3600,
        mining_rate: 1.5,
        started_at: new Date(Date.now() - 86400000).toISOString(),
        completed_at: new Date(Date.now() - 82800000).toISOString()
      };

      res.json(createResponse(true, 'Mining session retrieved successfully (mock)', { session: mockSession }));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user mining statistics
   */
  async getUserMiningStats(req, res, next) {
    try {
      const userId = req.user.userId;
      const stats = await mobileMiningService.getUserMiningStats(userId);

      // Convert milliseconds to seconds for API response
      const responseStats = {
        totalSessions: stats.totalSessions,
        completedSessions: stats.completedSessions,
        totalTokensEarned: stats.totalEarnings,
        totalMiningTimeSeconds: Math.floor(stats.totalMiningTime / 1000),
        averageSessionTimeSeconds: Math.floor(stats.averageSessionDuration / 1000),
        lastMiningSession: stats.lastMiningSession
      };

      res.json(createResponse(true, 'User mining stats retrieved successfully', { stats: responseStats }));
    } catch (error) {
      console.error('Error getting user mining stats:', error);
      next(error);
    }
  }

  async getDailyMiningStats(req, res, next) {
    try {
      const mockDailyStats = [
        { date: '2024-01-15', sessions: 3, tokensEarned: 45.2, miningTime: 10800 },
        { date: '2024-01-14', sessions: 2, tokensEarned: 28.5, miningTime: 7200 },
        { date: '2024-01-13', sessions: 4, tokensEarned: 52.1, miningTime: 14400 }
      ];

      res.json(createResponse(true, 'Daily mining stats retrieved successfully (mock)', { stats: mockDailyStats }));
    } catch (error) {
      next(error);
    }
  }

  async getWeeklyMiningStats(req, res, next) {
    try {
      const mockWeeklyStats = [
        { week: '2024-W03', sessions: 18, tokensEarned: 285.7, miningTime: 64800 },
        { week: '2024-W02', sessions: 15, tokensEarned: 225.3, miningTime: 54000 },
        { week: '2024-W01', sessions: 12, tokensEarned: 180.9, miningTime: 43200 }
      ];

      res.json(createResponse(true, 'Weekly mining stats retrieved successfully (mock)', { stats: mockWeeklyStats }));
    } catch (error) {
      next(error);
    }
  }

  async getMonthlyMiningStats(req, res, next) {
    try {
      const mockMonthlyStats = [
        { month: '2024-01', sessions: 45, tokensEarned: 691.9, miningTime: 162000 },
        { month: '2023-12', sessions: 38, tokensEarned: 542.6, miningTime: 136800 },
        { month: '2023-11', sessions: 42, tokensEarned: 618.4, miningTime: 151200 }
      ];

      res.json(createResponse(true, 'Monthly mining stats retrieved successfully (mock)', { stats: mockMonthlyStats }));
    } catch (error) {
      next(error);
    }
  }



  async getMiningRate(req, res, next) {
    try {
      const mockRate = {
        currentRate: 1.5,
        baseRate: 1.0,
        bonusRate: 0.5,
        factors: {
          userLevel: 1.2,
          streak: 1.1,
          premium: 1.0
        }
      };

      res.json(createResponse(true, 'Mining rate retrieved successfully (mock)', { rate: mockRate }));
    } catch (error) {
      next(error);
    }
  }

  async updateMiningRate(req, res, next) {
    try {
      const { rate } = req.body;

      const mockUpdatedRate = {
        newRate: rate,
        previousRate: 1.5,
        updatedAt: new Date().toISOString()
      };

      res.json(createResponse(true, 'Mining rate updated successfully (mock)', mockUpdatedRate));
    } catch (error) {
      next(error);
    }
  }

  async getMiningAchievements(req, res, next) {
    try {
      const mockAchievements = [
        { id: 1, name: 'First Mine', description: 'Complete your first mining session', unlocked: true, unlockedAt: '2024-01-10' },
        { id: 2, name: 'Steady Miner', description: 'Mine for 10 consecutive days', unlocked: true, unlockedAt: '2024-01-15' },
        { id: 3, name: 'Token Collector', description: 'Earn 100 CELF tokens', unlocked: false, progress: 65 }
      ];

      res.json(createResponse(true, 'Mining achievements retrieved successfully (mock)', { achievements: mockAchievements }));
    } catch (error) {
      next(error);
    }
  }

  async getMiningMilestones(req, res, next) {
    try {
      const mockMilestones = [
        { id: 1, target: 50, current: 65, type: 'tokens_earned', reward: '5 bonus tokens', completed: true },
        { id: 2, target: 100, current: 65, type: 'tokens_earned', reward: '10 bonus tokens', completed: false },
        { id: 3, target: 10, current: 15, type: 'sessions_completed', reward: 'Rate boost', completed: true }
      ];

      res.json(createResponse(true, 'Mining milestones retrieved successfully (mock)', { milestones: mockMilestones }));
    } catch (error) {
      next(error);
    }
  }

  async getMiningLeaderboard(req, res, next) {
    try {
      const mockLeaderboard = [
        { rank: 1, username: 'MinerPro', tokensEarned: 1250.5, sessionsCompleted: 85 },
        { rank: 2, username: 'CryptoKing', tokensEarned: 1180.2, sessionsCompleted: 78 },
        { rank: 3, username: 'TokenHunter', tokensEarned: 1050.8, sessionsCompleted: 72 },
        { rank: 15, username: 'You', tokensEarned: 245.75, sessionsCompleted: 15 }
      ];

      res.json(createResponse(true, 'Mining leaderboard retrieved successfully (mock)', { leaderboard: mockLeaderboard }));
    } catch (error) {
      next(error);
    }
  }

  async getFriendsLeaderboard(req, res, next) {
    try {
      const mockFriendsLeaderboard = [
        { rank: 1, username: 'BestFriend', tokensEarned: 450.2, sessionsCompleted: 32 },
        { rank: 2, username: 'You', tokensEarned: 245.75, sessionsCompleted: 15 },
        { rank: 3, username: 'MiningBuddy', tokensEarned: 180.5, sessionsCompleted: 12 }
      ];

      res.json(createResponse(true, 'Friends leaderboard retrieved successfully (mock)', { leaderboard: mockFriendsLeaderboard }));
    } catch (error) {
      next(error);
    }
  }

  // Admin routes
  async getAllMiningSessions(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const mockAdminSessions = [
        {
          id: '1',
          userId: 'user-1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          status: 'completed',
          tokens_earned: 25.5,
          runtime_seconds: 3600,
          started_at: new Date(Date.now() - 86400000).toISOString(),
          completed_at: new Date(Date.now() - 82800000).toISOString()
        },
        {
          id: '2',
          userId: 'user-2',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          status: 'active',
          tokens_earned: 12.3,
          runtime_seconds: 1800,
          started_at: new Date(Date.now() - 1800000).toISOString()
        }
      ];

      res.json(createResponse(true, 'All mining sessions retrieved successfully (mock)', {
        sessions: mockAdminSessions,
        pagination: {
          page,
          limit,
          total: 2,
          pages: 1
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async getGlobalMiningStats(req, res, next) {
    try {
      const mockGlobalStats = {
        totalSessions: 1250,
        activeSessions: 45,
        completedSessions: 1180,
        failedSessions: 25,
        totalTokensEarned: 15750.25,
        totalMiningTime: 4500000, // seconds
        averageSessionTime: 3600,
        successRate: 94.4,
        topMiners: [
          { username: 'MinerPro', tokensEarned: 1250.5 },
          { username: 'CryptoKing', tokensEarned: 1180.2 },
          { username: 'TokenHunter', tokensEarned: 1050.8 }
        ]
      };

      res.json(createResponse(true, 'Global mining statistics retrieved successfully (mock)', { stats: mockGlobalStats }));
    } catch (error) {
      next(error);
    }
  }

  async getUserMiningSessionsAdmin(req, res, next) {
    try {
      const { userId } = req.params;

      const mockUserSessions = [
        {
          id: '1',
          status: 'completed',
          tokens_earned: 25.5,
          runtime_seconds: 3600,
          started_at: new Date(Date.now() - 86400000).toISOString(),
          completed_at: new Date(Date.now() - 82800000).toISOString()
        }
      ];

      res.json(createResponse(true, 'User mining sessions retrieved successfully (mock)', { sessions: mockUserSessions }));
    } catch (error) {
      next(error);
    }
  }

  async updateSessionStatusAdmin(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const mockUpdatedSession = {
        id,
        status,
        updatedAt: new Date().toISOString(),
        updatedBy: req.user.userId
      };

      res.json(createResponse(true, 'Session status updated successfully (mock)', { session: mockUpdatedSession }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MiningController();
