const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');

const walletController = require('../controllers/walletController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

// Validation rules
const sendTokensValidation = [
  body('toAddress').notEmpty().withMessage('Recipient address is required'),
  body('amount').isFloat({ min: 0.0001 }).withMessage('Amount must be greater than 0.0001'),
  body('description').optional().trim().isLength({ max: 200 })
];

const sendTokensByEmailValidation = [
  body('toEmail').isEmail().withMessage('Valid recipient email is required'),
  body('amount').isFloat({ min: 0.0001 }).withMessage('Amount must be greater than 0.0001'),
  body('description').optional().trim().isLength({ max: 200 })
];

const exchangeTokensValidation = [
  body('amount').isFloat({ min: 0.0001 }).withMessage('Amount must be greater than 0.0001'),
  body('fromType').isIn(['sendable', 'nonSendable']).withMessage('Invalid token type'),
  body('toType').isIn(['sendable', 'nonSendable']).withMessage('Invalid token type')
];

const addAddressValidation = [
  body('address').notEmpty().withMessage('Address is required'),
  body('label').optional().trim().isLength({ max: 50 })
];

// Wallet balance and info routes
router.get('/balance', authenticate, walletController.getBalance);
router.get('/balance/breakdown', authenticate, walletController.getBalanceBreakdown);
router.get('/addresses', authenticate, walletController.getAddresses);
router.post('/addresses', authenticate, addAddressValidation, validateRequest, walletController.addAddress);
router.put('/addresses/:address/default', authenticate, walletController.setDefaultAddress);

// Transaction routes
router.get('/transactions', authenticate, walletController.getTransactions);
router.get('/transactions/:id', authenticate, [param('id').notEmpty()], validateRequest, walletController.getTransactionById);
router.post('/send', authenticate, sendTokensValidation, validateRequest, walletController.sendTokens);
router.post('/send-by-email', authenticate, sendTokensByEmailValidation, validateRequest, walletController.sendTokensByEmail);

// Token exchange routes
router.post('/exchange', authenticate, exchangeTokensValidation, validateRequest, walletController.exchangeTokens);
router.get('/exchange/rates', authenticate, walletController.getExchangeRates);

// Mining rewards (called by mining service)
router.post('/mining-reward', authenticate, [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be positive'),
  body('sessionId').optional().notEmpty()
], validateRequest, walletController.addMiningReward);

// Wallet statistics
router.get('/stats', authenticate, walletController.getWalletStats);

// Currency and display preferences
router.get('/preferences', authenticate, walletController.getPreferences);
router.put('/preferences', authenticate, [
  body('currency').optional().isIn(['CELF', 'USD']),
  body('notifications').optional().isBoolean()
], validateRequest, walletController.updatePreferences);

module.exports = router;
