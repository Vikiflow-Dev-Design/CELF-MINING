const { body, param, query } = require('express-validator');

// Achievement ID validation
const achievementIdValidation = [
  param('achievementId')
    .notEmpty()
    .withMessage('Achievement ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Achievement ID must be between 1 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Achievement ID can only contain letters, numbers, hyphens, and underscores')
];

// User ID validation for admin routes
const userIdValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Valid user ID is required')
];

// MongoDB ObjectId validation
const mongoIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Valid ID is required')
];

// Query parameter validation for filtering achievements
const achievementQueryValidation = [
  query('category')
    .optional()
    .isIn(['all', 'mining', 'social', 'wallet', 'milestone'])
    .withMessage('Category must be one of: all, mining, social, wallet, milestone'),
  query('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
  query('rewardClaimed')
    .optional()
    .isBoolean()
    .withMessage('RewardClaimed must be a boolean value'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer')
];

// Achievement creation validation (admin only)
const createAchievementValidation = [
  body('achievementId')
    .notEmpty()
    .withMessage('Achievement ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Achievement ID must be between 1 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Achievement ID can only contain letters, numbers, hyphens, and underscores'),
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters')
    .trim(),
  body('category')
    .isIn(['mining', 'social', 'wallet', 'milestone'])
    .withMessage('Category must be one of: mining, social, wallet, milestone'),
  body('maxProgress')
    .isInt({ min: 1 })
    .withMessage('Max progress must be a positive integer'),
  body('reward')
    .isFloat({ min: 0 })
    .withMessage('Reward must be a non-negative number'),
  body('icon')
    .notEmpty()
    .withMessage('Icon is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Icon must be between 1 and 50 characters')
    .trim(),
  body('tips')
    .optional()
    .isArray()
    .withMessage('Tips must be an array'),
  body('tips.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Each tip must be 200 characters or less')
    .trim(),
  body('requirements')
    .optional()
    .isArray()
    .withMessage('Requirements must be an array'),
  body('requirements.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Each requirement must be 200 characters or less')
    .trim(),
  body('conditions')
    .optional()
    .isObject()
    .withMessage('Conditions must be an object'),
  body('conditions.miningSessionsRequired')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Mining sessions required must be a non-negative integer'),
  body('conditions.miningAmountRequired')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Mining amount required must be a non-negative number'),
  body('conditions.referralsRequired')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Referrals required must be a non-negative integer'),
  body('conditions.transactionsRequired')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Transactions required must be a non-negative integer'),
  body('conditions.balanceRequired')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Balance required must be a non-negative number'),
  body('conditions.totalTokensRequired')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total tokens required must be a non-negative number'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('IsActive must be a boolean value'),
  body('trackingType')
    .optional()
    .isIn(['manual', 'automatic'])
    .withMessage('Tracking type must be either manual or automatic')
];

// Achievement update validation (admin only)
const updateAchievementValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters')
    .trim(),
  body('category')
    .optional()
    .isIn(['mining', 'social', 'wallet', 'milestone'])
    .withMessage('Category must be one of: mining, social, wallet, milestone'),
  body('maxProgress')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max progress must be a positive integer'),
  body('reward')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Reward must be a non-negative number'),
  body('icon')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Icon must be between 1 and 50 characters')
    .trim(),
  body('tips')
    .optional()
    .isArray()
    .withMessage('Tips must be an array'),
  body('tips.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Each tip must be 200 characters or less')
    .trim(),
  body('requirements')
    .optional()
    .isArray()
    .withMessage('Requirements must be an array'),
  body('requirements.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Each requirement must be 200 characters or less')
    .trim(),
  body('conditions')
    .optional()
    .isObject()
    .withMessage('Conditions must be an object'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('IsActive must be a boolean value'),
  body('trackingType')
    .optional()
    .isIn(['manual', 'automatic'])
    .withMessage('Tracking type must be either manual or automatic')
];

// Progress update validation
const updateProgressValidation = [
  body('progress')
    .isInt({ min: 0 })
    .withMessage('Progress must be a non-negative integer'),
  body('source')
    .optional()
    .isIn(['mining', 'transaction', 'referral', 'manual', 'bonus'])
    .withMessage('Source must be one of: mining, transaction, referral, manual, bonus'),
  body('details')
    .optional()
    .isObject()
    .withMessage('Details must be an object')
];

// Bulk progress update validation (admin only)
const bulkUpdateProgressValidation = [
  body('updates')
    .isArray({ min: 1 })
    .withMessage('Updates must be a non-empty array'),
  body('updates.*.userId')
    .isMongoId()
    .withMessage('Valid user ID is required for each update'),
  body('updates.*.achievementId')
    .notEmpty()
    .withMessage('Achievement ID is required for each update'),
  body('updates.*.progress')
    .isInt({ min: 0 })
    .withMessage('Progress must be a non-negative integer for each update'),
  body('updates.*.source')
    .optional()
    .isIn(['mining', 'transaction', 'referral', 'manual', 'bonus'])
    .withMessage('Source must be valid for each update')
];

// Achievement statistics query validation
const statsQueryValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
  query('category')
    .optional()
    .isIn(['mining', 'social', 'wallet', 'milestone'])
    .withMessage('Category must be one of: mining, social, wallet, milestone')
];

module.exports = {
  achievementIdValidation,
  userIdValidation,
  mongoIdValidation,
  achievementQueryValidation,
  createAchievementValidation,
  updateAchievementValidation,
  updateProgressValidation,
  bulkUpdateProgressValidation,
  statsQueryValidation
};
