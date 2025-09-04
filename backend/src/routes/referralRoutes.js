/**
 * Referral Routes
 * API endpoints for referral system
 */

const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { authenticate } = require('../middleware/authMiddleware');

// Public routes (no authentication required)
router.get('/validate/:code', referralController.validateReferralCode);
router.get('/leaderboard', referralController.getReferralLeaderboard);

// Protected routes (authentication required)
router.use(authenticate);

// Get user's referral information and statistics
router.get('/info', referralController.getReferralInfo);

// Generate or regenerate referral code
router.post('/generate-code', referralController.generateReferralCode);

// Get detailed referral history
router.get('/history', referralController.getReferralHistory);

// Process referral signup (called during registration)
router.post('/process-signup', referralController.processReferralSignup);

module.exports = router;
