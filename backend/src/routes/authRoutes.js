const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validationMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Debug route to test request parsing
router.post('/debug', (req, res) => {
  console.log('🐛 Debug endpoint - Request body:', JSON.stringify(req.body, null, 2));
  console.log('🐛 Debug endpoint - Headers:', JSON.stringify(req.headers, null, 2));
  res.json({
    success: true,
    message: 'Debug endpoint',
    receivedBody: req.body,
    bodyType: typeof req.body,
    bodyKeys: Object.keys(req.body || {})
  });
});

// Routes
router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', [body('email').isEmail().normalizeEmail()], validateRequest, authController.forgotPassword);
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 6 })
], validateRequest, authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', [body('email').isEmail().normalizeEmail()], validateRequest, authController.resendVerification);

module.exports = router;
