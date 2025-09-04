const express = require('express');
const { body, param, query } = require('express-validator');
const achievementController = require('../controllers/achievementController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation schemas
const createAchievementValidation = [
  body('achievementId')
    .notEmpty()
    .withMessage('Achievement ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Achievement ID must be between 1 and 50 characters'),
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
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
    .withMessage('Icon is required'),
  body('tips')
    .optional()
    .isArray()
    .withMessage('Tips must be an array'),
  body('requirements')
    .optional()
    .isArray()
    .withMessage('Requirements must be an array')
];

const updateAchievementValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
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
  body('tips')
    .optional()
    .isArray()
    .withMessage('Tips must be an array'),
  body('requirements')
    .optional()
    .isArray()
    .withMessage('Requirements must be an array')
];

const updateProgressValidation = [
  body('progress')
    .isInt({ min: 0 })
    .withMessage('Progress must be a non-negative integer')
];

const achievementIdValidation = [
  param('achievementId')
    .notEmpty()
    .withMessage('Achievement ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Achievement ID must be between 1 and 50 characters')
];

const userIdValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Valid user ID is required')
];

const queryValidation = [
  query('category')
    .optional()
    .isIn(['all', 'mining', 'social', 'wallet', 'milestone'])
    .withMessage('Category must be one of: all, mining, social, wallet, milestone'),
  query('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value')
];

// Public user routes (require authentication)
router.get('/', 
  authenticate, 
  queryValidation, 
  validateRequest, 
  achievementController.getUserAchievements
);

router.get('/stats', 
  authenticate, 
  achievementController.getUserStats
);

router.get('/:achievementId', 
  authenticate, 
  achievementIdValidation, 
  validateRequest, 
  achievementController.getAchievementDetails
);

router.post('/:achievementId/claim', 
  authenticate, 
  achievementIdValidation, 
  validateRequest, 
  achievementController.claimReward
);

router.post('/initialize', 
  authenticate, 
  achievementController.initializeUserAchievements
);

// Admin routes (require admin authorization)
router.get('/admin/all', 
  authenticate, 
  authorize(['admin']), 
  achievementController.getAllAchievements
);

router.post('/admin/create', 
  authenticate, 
  authorize(['admin']), 
  createAchievementValidation, 
  validateRequest, 
  achievementController.createAchievement
);

router.put('/admin/:id', 
  authenticate, 
  authorize(['admin']), 
  [param('id').isMongoId().withMessage('Valid achievement ID is required')],
  updateAchievementValidation, 
  validateRequest, 
  achievementController.updateAchievement
);

router.delete('/admin/:id', 
  authenticate, 
  authorize(['admin']), 
  [param('id').isMongoId().withMessage('Valid achievement ID is required')],
  validateRequest, 
  achievementController.deleteAchievement
);

router.put('/admin/users/:userId/:achievementId/progress', 
  authenticate, 
  authorize(['admin']), 
  userIdValidation,
  achievementIdValidation,
  updateProgressValidation, 
  validateRequest, 
  achievementController.updateUserProgress
);

// Error handling middleware specific to achievement routes
router.use((error, req, res, next) => {
  console.error('Achievement route error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Achievement with this ID already exists'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

module.exports = router;
