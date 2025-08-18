const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const newsletterController = require('../controllers/newsletterController');
const { validateRequest } = require('../middleware/validationMiddleware');

// Newsletter subscription validation
const subscriptionValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('firstName').optional().trim().isLength({ max: 50 }),
  body('lastName').optional().trim().isLength({ max: 50 }),
  body('preferences').optional().isObject()
];

// Unsubscribe validation
const unsubscribeValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('reason').optional().trim().isLength({ max: 500 })
];

// Newsletter subscription
router.post('/subscribe', subscriptionValidation, validateRequest, newsletterController.subscribe);

// Newsletter unsubscription
router.post('/unsubscribe', unsubscribeValidation, validateRequest, newsletterController.unsubscribe);

// Unsubscribe via token (from email link)
router.get('/unsubscribe/:token', newsletterController.unsubscribeByToken);

// Update subscription preferences
router.put('/preferences', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('preferences').isObject().withMessage('Preferences object is required'),
  body('preferences.frequency').optional().isIn(['daily', 'weekly', 'monthly']),
  body('preferences.topics').optional().isArray(),
  body('preferences.format').optional().isIn(['html', 'text'])
], validateRequest, newsletterController.updatePreferences);

// Get subscription status
router.get('/status/:email', newsletterController.getSubscriptionStatus);

// Admin routes for newsletter management
router.get('/subscribers', newsletterController.getSubscribers);
router.get('/subscribers/stats', newsletterController.getSubscriberStats);

// Newsletter campaign management (admin only)
router.post('/campaigns', [
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content is required'),
  body('scheduledFor').optional().isISO8601().withMessage('Invalid date format'),
  body('targetAudience').optional().isObject()
], validateRequest, newsletterController.createCampaign);

router.get('/campaigns', newsletterController.getCampaigns);
router.get('/campaigns/:id', newsletterController.getCampaignById);
router.put('/campaigns/:id', newsletterController.updateCampaign);
router.post('/campaigns/:id/send', newsletterController.sendCampaign);

// Newsletter analytics
router.get('/analytics/opens/:campaignId', newsletterController.getOpenAnalytics);
router.get('/analytics/clicks/:campaignId', newsletterController.getClickAnalytics);

module.exports = router;
