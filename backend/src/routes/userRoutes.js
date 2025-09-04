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

// Search and validation routes (main endpoints)
router.get('/search', authenticate, userController.searchUsers);
router.get('/validate-address/:address', authenticate, userController.validateAddress);
router.get('/by-address/:address', authenticate, userController.getUserByAddress);

// Test endpoint for debugging (no auth required)
router.get('/search-test', (req, res) => {
  console.log('🧪 Test endpoint hit:', req.query);
  res.json({
    success: true,
    message: 'Search test endpoint working',
    query: req.query,
    timestamp: new Date().toISOString()
  });
});

// Search endpoint without authentication for testing
router.get('/search-no-auth', async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;

    console.log('🔍 No-auth search request:', { query, limit });

    if (!query || query.trim().length < 2) {
      return res.json({ success: true, message: 'Query too short', data: [] });
    }

    // Return mock users for testing
    const mockUsers = [
      {
        id: 'mock-1',
        email: 'victor@example.com',
        firstName: 'Victor',
        lastName: 'Ezekiel',
        walletAddress: 'celf1234567890abcdef1234567890abcdef12345678'
      },
      {
        id: 'mock-2',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        walletAddress: 'celf9876543210fedcba9876543210fedcba87654321'
      },
      {
        id: 'mock-3',
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        walletAddress: 'celfabcdef1234567890abcdef1234567890abcdef12'
      }
    ];

    // Filter based on query
    const filteredUsers = mockUsers.filter(user => {
      const searchLower = query.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower)
      );
    });

    console.log('✅ Returning filtered mock users:', filteredUsers);
    res.json({ success: true, message: 'Users found', data: filteredUsers.slice(0, limit) });
  } catch (error) {
    console.error('❌ Search error:', error);
    res.status(500).json({ success: false, message: 'Search failed: ' + error.message });
  }
});



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
