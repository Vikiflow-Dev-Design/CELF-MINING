const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const mentorshipController = require('../controllers/mentorshipController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

// Mentorship application validation
const mentorApplicationValidation = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('education').trim().isLength({ min: 10 }).withMessage('Education background is required'),
  body('experience').trim().isLength({ min: 10 }).withMessage('Experience description is required'),
  body('expertise').isArray({ min: 1 }).withMessage('At least one area of expertise is required'),
  body('availability').isObject().withMessage('Availability information is required'),
  body('motivation').trim().isLength({ min: 50 }).withMessage('Motivation must be at least 50 characters'),
  body('linkedinProfile').optional().isURL(),
  body('resume').optional().isString()
];

const menteeApplicationValidation = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('currentEducation').trim().isLength({ min: 10 }).withMessage('Current education status is required'),
  body('goals').trim().isLength({ min: 50 }).withMessage('Goals must be at least 50 characters'),
  body('interests').isArray({ min: 1 }).withMessage('At least one area of interest is required'),
  body('availability').isObject().withMessage('Availability information is required'),
  body('experience').optional().trim(),
  body('challenges').trim().isLength({ min: 20 }).withMessage('Challenges description is required')
];

// Public application routes
router.post('/apply/mentor', mentorApplicationValidation, validateRequest, mentorshipController.applyAsMentor);
router.post('/apply/mentee', menteeApplicationValidation, validateRequest, mentorshipController.applyAsMentee);

// Get available mentors (public)
router.get('/mentors', mentorshipController.getAvailableMentors);
router.get('/mentors/:id', mentorshipController.getMentorById);

// Application status check
router.get('/application/status/:email', mentorshipController.getApplicationStatus);

// Authenticated routes
router.use(authenticate); // All routes below require authentication

// User's mentorship profile and applications
router.get('/my-applications', mentorshipController.getMyApplications);
router.get('/my-profile', mentorshipController.getMyProfile);
router.put('/my-profile', mentorshipController.updateMyProfile);

// Mentorship matching and connections
router.get('/matches', mentorshipController.getMatches);
router.post('/connect/:mentorId', mentorshipController.requestConnection);
router.put('/connections/:connectionId/status', [
  body('status').isIn(['accepted', 'declined']).withMessage('Invalid status')
], validateRequest, mentorshipController.updateConnectionStatus);

// Mentorship sessions
router.get('/sessions', mentorshipController.getSessions);
router.post('/sessions', [
  body('mentorId').optional().notEmpty(),
  body('menteeId').optional().notEmpty(),
  body('scheduledFor').isISO8601().withMessage('Valid date is required'),
  body('duration').isInt({ min: 15, max: 180 }).withMessage('Duration must be between 15 and 180 minutes'),
  body('topic').trim().isLength({ min: 5 }).withMessage('Session topic is required'),
  body('notes').optional().trim()
], validateRequest, mentorshipController.scheduleSession);

router.get('/sessions/:id', mentorshipController.getSessionById);
router.put('/sessions/:id', mentorshipController.updateSession);
router.post('/sessions/:id/complete', [
  body('notes').optional().trim(),
  body('rating').optional().isInt({ min: 1, max: 5 })
], validateRequest, mentorshipController.completeSession);

// Admin routes
router.use(authorize(['admin', 'moderator'])); // Admin/moderator only routes

router.get('/applications', mentorshipController.getAllApplications);
router.get('/applications/:id', mentorshipController.getApplicationById);
router.put('/applications/:id/status', [
  body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
  body('notes').optional().trim()
], validateRequest, mentorshipController.updateApplicationStatus);

// Mentorship program statistics
router.get('/stats', mentorshipController.getMentorshipStats);

module.exports = router;
