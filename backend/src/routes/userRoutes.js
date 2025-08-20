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

// Validation for multiple user deletion
const deleteMultipleUsersValidation = [
  body('userIds').isArray({ min: 1 }).withMessage('User IDs array is required and cannot be empty'),
  body('userIds.*').isUUID().withMessage('Each user ID must be a valid UUID')
];

// Validation for delete all users
const deleteAllUsersValidation = [
  body('confirmationToken').equals('DELETE_ALL_USERS_CONFIRMED').withMessage('Confirmation token must be "DELETE_ALL_USERS_CONFIRMED"'),
  body('excludeAdmins').optional().isBoolean().withMessage('excludeAdmins must be a boolean')
];

// Admin routes
router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);
router.get('/:id', authenticate, authorize(['admin']), [param('id').isUUID()], validateRequest, userController.getUserById);
router.put('/:id/role', authenticate, authorize(['admin']), [
  param('id').isUUID(),
  body('role').isIn(['user', 'admin', 'moderator'])
], validateRequest, userController.updateUserRole);

// User deletion routes
router.get('/:id/deletion-preview', authenticate, authorize(['admin']), [param('id').isUUID()], validateRequest, userController.getUserDeletionPreview);
router.delete('/:id', authenticate, authorize(['admin']), [param('id').isUUID()], validateRequest, userController.deleteUser);
router.post('/delete-multiple', authenticate, authorize(['admin']), deleteMultipleUsersValidation, validateRequest, userController.deleteMultipleUsers);
router.post('/delete-all', authenticate, authorize(['super-admin']), deleteAllUsersValidation, validateRequest, userController.deleteAllUsers);

module.exports = router;
