const express = require('express');
const { body, param, query } = require('express-validator');
const taskController = require('../controllers/taskController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation schemas
const createTaskValidation = [
  body('taskId')
    .notEmpty()
    .withMessage('Task ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Task ID must be between 1 and 50 characters'),
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
    .isIn(['mining', 'social', 'wallet', 'referral'])
    .withMessage('Category must be one of: mining, social, wallet, referral'),
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
    .withMessage('Requirements must be an array'),
  body('conditions')
    .optional()
    .isObject()
    .withMessage('Conditions must be an object'),
  body('isLinkTask')
    .optional()
    .isBoolean()
    .withMessage('isLinkTask must be a boolean'),
  body('linkUrl')
    .optional()
    .isURL()
    .withMessage('Link URL must be a valid URL')
];

const updateTaskValidation = [
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
    .isIn(['mining', 'social', 'wallet', 'referral'])
    .withMessage('Category must be one of: mining, social, wallet, referral'),
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
    .withMessage('Requirements must be an array'),
  body('conditions')
    .optional()
    .isObject()
    .withMessage('Conditions must be an object'),
  body('isLinkTask')
    .optional()
    .isBoolean()
    .withMessage('isLinkTask must be a boolean'),
  body('linkUrl')
    .optional()
    .isURL()
    .withMessage('Link URL must be a valid URL'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('sortOrder')
    .optional()
    .isInt()
    .withMessage('Sort order must be an integer')
];

const taskIdValidation = [
  param('taskId')
    .notEmpty()
    .withMessage('Task ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Task ID must be between 1 and 50 characters')
];

const userIdValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Valid user ID is required')
];

const updateProgressValidation = [
  body('progress')
    .isInt({ min: 0 })
    .withMessage('Progress must be a non-negative integer')
];

const queryValidation = [
  query('category')
    .optional()
    .isIn(['all', 'mining', 'social', 'wallet', 'referral'])
    .withMessage('Category must be one of: all, mining, social, wallet, referral'),
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
  taskController.getUserTasks
);

router.get('/stats', 
  authenticate, 
  taskController.getUserStats
);

router.get('/:taskId', 
  authenticate, 
  taskIdValidation, 
  validateRequest, 
  taskController.getTaskDetails
);

router.post('/:taskId/claim', 
  authenticate, 
  taskIdValidation, 
  validateRequest, 
  taskController.claimReward
);

router.post('/initialize', 
  authenticate, 
  taskController.initializeUserTasks
);

// Admin routes (no authentication required for now)
router.get('/admin/all',
  taskController.getAllTasks
);

router.get('/admin/:id',
  [param('id').isMongoId().withMessage('Valid task ID is required')],
  validateRequest,
  taskController.getTaskById
);

router.post('/admin/create',
  createTaskValidation,
  validateRequest,
  taskController.createTask
);

router.put('/admin/:id', 
  [param('id').isMongoId().withMessage('Valid task ID is required')],
  updateTaskValidation, 
  validateRequest, 
  taskController.updateTask
);

router.delete('/admin/:id', 
  [param('id').isMongoId().withMessage('Valid task ID is required')],
  validateRequest, 
  taskController.deleteTask
);

router.put('/admin/users/:userId/:taskId/progress', 
  authenticate, 
  authorize(['admin']), 
  userIdValidation,
  taskIdValidation,
  updateProgressValidation, 
  validateRequest, 
  taskController.updateUserProgress
);

module.exports = router;
