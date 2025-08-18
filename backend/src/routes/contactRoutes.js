const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const contactController = require('../controllers/contactController');
const { validateRequest } = require('../middleware/validationMiddleware');

// Contact form validation
const contactFormValidation = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('inquiryType').isIn(['general', 'technical', 'partnership', 'media', 'other']).withMessage('Invalid inquiry type'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
];

// Support ticket validation
const supportTicketValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('priority').isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority level'),
  body('category').isIn(['technical', 'account', 'mining', 'wallet', 'general']).withMessage('Invalid category'),
  body('deviceInfo').optional().isObject(),
  body('attachments').optional().isArray()
];

// Contact form submission
router.post('/form', contactFormValidation, validateRequest, contactController.submitContactForm);

// Support ticket creation
router.post('/support', supportTicketValidation, validateRequest, contactController.createSupportTicket);

// Get contact form submissions (admin only)
router.get('/submissions', contactController.getContactSubmissions);

// Get support tickets
router.get('/support/tickets', contactController.getSupportTickets);
router.get('/support/tickets/:id', contactController.getSupportTicketById);

// Update support ticket status (admin only)
router.put('/support/tickets/:id/status', [
  body('status').isIn(['open', 'in-progress', 'resolved', 'closed']).withMessage('Invalid status'),
  body('response').optional().trim(),
  body('assignedTo').optional().trim()
], validateRequest, contactController.updateSupportTicketStatus);

// Add response to support ticket
router.post('/support/tickets/:id/responses', [
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Response message is required'),
  body('isPublic').optional().isBoolean(),
  body('attachments').optional().isArray()
], validateRequest, contactController.addSupportTicketResponse);

module.exports = router;
