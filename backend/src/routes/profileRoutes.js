/**
 * Profile Routes
 * API routes for user profile management
 */

const express = require('express');
const { body, param, query } = require('express-validator');
const profileController = require('../controllers/profileController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation schemas
const updateProfileValidation = [
  body('username')
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('displayName')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Display name must be between 1 and 100 characters')
    .trim(),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters')
    .trim(),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters')
    .trim(),
  body('country')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Country must be less than 100 characters')
    .trim(),
  body('firstName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters')
    .trim(),
  body('lastName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters')
    .trim()
];

const uploadPictureValidation = [
  body('imageUrl')
    .notEmpty()
    .withMessage('Image URL is required')
    .isURL()
    .withMessage('Must be a valid URL')
];

const userIdValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Valid user ID is required')
];

const searchValidation = [
  query('q')
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Search query must be between 2 and 50 characters'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

const updateStatsValidation = [
  body('totalMined')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total mined must be a non-negative number'),
  body('referralsCount')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Referrals count must be a non-negative integer'),
  body('achievementsCount')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Achievements count must be a non-negative integer')
];

// Public user routes (require authentication)
router.get('/', 
  authenticate, 
  profileController.getProfile
);

router.put('/', 
  authenticate, 
  updateProfileValidation, 
  validateRequest, 
  profileController.updateProfile
);

router.post('/picture', 
  authenticate, 
  uploadPictureValidation, 
  validateRequest, 
  profileController.uploadProfilePicture
);

router.get('/completion', 
  authenticate, 
  profileController.getProfileCompletion
);

router.get('/search', 
  authenticate, 
  searchValidation, 
  validateRequest, 
  profileController.searchUsers
);

router.get('/user/:userId', 
  authenticate, 
  userIdValidation, 
  validateRequest, 
  profileController.getUserProfile
);

// Admin routes (require admin authorization)
router.put('/admin/:userId/stats', 
  authenticate, 
  authorize(['admin']), 
  userIdValidation,
  updateStatsValidation, 
  validateRequest, 
  profileController.updateUserStats
);

module.exports = router;
