const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');

const miningController = require('../controllers/miningController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

// Validation rules for mobile app mining
const startMiningValidation = [
  body('miningRate').optional().isFloat({ min: 0.001, max: 1000 }).withMessage('Mining rate must be between 0.001 and 1000 CELF/hour'),
  body('deviceInfo').optional().isObject().withMessage('Device info must be an object')
];

const updateMiningProgressValidation = [
  body('sessionId').notEmpty().withMessage('Session ID is required'),
  body('tokensEarned').isFloat({ min: 0 }).withMessage('Tokens earned must be positive'),
  body('runtime').isInt({ min: 0 }).withMessage('Runtime must be positive')
];

// Current mining session routes (for mobile app)
router.get('/status', authenticate, miningController.getMiningStatus);
router.post('/start', authenticate, miningController.startMining);
router.post('/stop', authenticate, miningController.stopMining);
router.post('/cancel', authenticate, miningController.cancelMining);
router.post('/pause', authenticate, miningController.pauseMining);
router.post('/resume', authenticate, miningController.resumeMining);

// Mining progress and updates
router.post('/progress', authenticate, updateMiningProgressValidation, validateRequest, miningController.updateMiningProgress);
router.get('/current-session', authenticate, miningController.getCurrentSession);

// Mining history and statistics
router.get('/sessions', authenticate, miningController.getMiningSessions);
router.get('/sessions/:id', authenticate, [param('id').notEmpty()], validateRequest, miningController.getMiningSessionById);
router.get('/stats', authenticate, miningController.getUserMiningStats);
router.get('/stats/daily', authenticate, miningController.getDailyMiningStats);
router.get('/stats/weekly', authenticate, miningController.getWeeklyMiningStats);
router.get('/stats/monthly', authenticate, miningController.getMonthlyMiningStats);

// Mining rate and configuration
router.get('/rate', authenticate, miningController.getMiningRate);
router.put('/rate', authenticate, [
  body('rate').isFloat({ min: 0.001, max: 10 }).withMessage('Mining rate must be between 0.001 and 10 CELF/hour')
], validateRequest, miningController.updateMiningRate);

// Mining achievements and milestones
router.get('/achievements', authenticate, miningController.getMiningAchievements);
router.get('/milestones', authenticate, miningController.getMiningMilestones);

// Mining leaderboard
router.get('/leaderboard', authenticate, miningController.getMiningLeaderboard);
router.get('/leaderboard/friends', authenticate, miningController.getFriendsLeaderboard);

// Admin routes
router.use(authorize(['admin', 'moderator'])); // Admin/moderator only routes below

router.get('/admin/all-sessions', miningController.getAllMiningSessions);
router.get('/admin/stats', miningController.getGlobalMiningStats);
router.get('/admin/users/:userId/sessions', miningController.getUserMiningSessionsAdmin);
router.put('/admin/sessions/:id/status', [
  body('status').isIn(['active', 'paused', 'completed', 'cancelled']).withMessage('Invalid status')
], validateRequest, miningController.updateSessionStatusAdmin);

module.exports = router;
