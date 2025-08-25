const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');
const adminController = require('../controllers/adminController');

// Temporarily disable authentication for demo purposes
// TODO: Re-enable authentication when admin accounts are set up
// router.use(authenticate);
// router.use(authorize(['admin', 'moderator']));

// Health check for admin settings
router.get('/health/settings', adminController.checkAdminSettings);

// Dashboard & Analytics
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/dashboard/recent-activity', adminController.getRecentActivity);
router.get('/analytics/users', adminController.getUserAnalytics);
router.get('/analytics/mining', adminController.getMiningAnalytics);
router.get('/analytics/transactions', adminController.getTransactionAnalytics);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', [
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['user', 'admin', 'moderator']),
  body('isActive').optional().isBoolean()
], validateRequest, adminController.updateUser);
router.post('/users/:id/suspend', adminController.suspendUser);
router.post('/users/:id/activate', adminController.activateUser);
router.delete('/users/:id', adminController.deleteUser);

// Mining Management
router.get('/mining/sessions', adminController.getMiningSessions);
router.get('/mining/settings', adminController.getMiningSettings);
router.put('/mining/settings', [
  body('defaultMiningRate').optional().isFloat({ min: 0.001, max: 1000 }),
  body('maxSessionTime').optional().isInt({ min: 60, max: 86400 }), // 1 minute to 24 hours
  body('miningSpeed').optional().isFloat({ min: 0.1, max: 100 }),
  body('rewardMultiplier').optional().isFloat({ min: 0.1, max: 100 }),
  body('maintenanceMode').optional().isBoolean(),
  body('minTokensToMine').optional().isFloat({ min: 0.001, max: 10 }),
  body('maxTokensPerSession').optional().isFloat({ min: 1, max: 10000 })
], validateRequest, adminController.updateMiningSettings);
router.post('/mining/sessions/:id/terminate', adminController.terminateMiningSession);
router.post('/mining/sessions/:id/pause', adminController.pauseMiningSession);
router.post('/mining/sessions/:id/resume', adminController.resumeMiningSession);

// Content Management
router.get('/content/contact-submissions', adminController.getContactSubmissions);
router.get('/content/contact-submissions/:id', adminController.getContactSubmissionById);
router.put('/content/contact-submissions/:id/status', [
  body('status').isIn(['pending', 'in_progress', 'resolved', 'closed'])
], validateRequest, adminController.updateContactSubmissionStatus);
router.delete('/content/contact-submissions/:id', adminController.deleteContactSubmission);

router.get('/content/newsletter-subscriptions', adminController.getNewsletterSubscriptions);
router.delete('/content/newsletter-subscriptions/:id', adminController.deleteNewsletterSubscription);

router.get('/content/mentorship-applications', adminController.getMentorshipApplications);
router.get('/content/mentorship-applications/:id', adminController.getMentorshipApplicationById);
router.put('/content/mentorship-applications/:id/status', [
  body('status').isIn(['pending', 'approved', 'rejected'])
], validateRequest, adminController.updateMentorshipApplicationStatus);

router.get('/content/scholarship-applications', adminController.getScholarshipApplications);
router.get('/content/scholarship-applications/:id', adminController.getScholarshipApplicationById);
router.put('/content/scholarship-applications/:id/status', [
  body('status').isIn(['pending', 'approved', 'rejected'])
], validateRequest, adminController.updateScholarshipApplicationStatus);

// System Settings
router.get('/settings', adminController.getSystemSettings);
router.put('/settings', [
  body('siteName').optional().trim().isLength({ min: 1, max: 100 }),
  body('maintenanceMode').optional().isBoolean(),
  body('registrationEnabled').optional().isBoolean(),
  body('miningEnabled').optional().isBoolean(),
  body('maxUsersPerDay').optional().isInt({ min: 1 }),
  body('emailNotifications').optional().isBoolean()
], validateRequest, adminController.updateSystemSettings);

// Security & Audit
router.get('/security/audit-logs', adminController.getAuditLogs);
router.get('/security/login-attempts', adminController.getLoginAttempts);
router.get('/security/suspicious-activities', adminController.getSuspiciousActivities);

module.exports = router;
