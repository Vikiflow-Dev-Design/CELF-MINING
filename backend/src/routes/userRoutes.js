const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

// Validation rules
const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail()
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// Routes
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, updateProfileValidation, validateRequest, userController.updateProfile);
router.post('/change-password', authenticate, changePasswordValidation, validateRequest, userController.changePassword);
router.delete('/account', authenticate, userController.deleteAccount);

// Admin routes
router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);
router.get('/:id', authenticate, authorize(['admin']), [param('id').isMongoId()], validateRequest, userController.getUserById);
router.put('/:id/role', authenticate, authorize(['admin']), [
  param('id').isMongoId(),
  body('role').isIn(['user', 'admin', 'moderator'])
], validateRequest, userController.updateUserRole);
router.delete('/:id', authenticate, authorize(['admin']), [param('id').isMongoId()], validateRequest, userController.deleteUser);

module.exports = router;
