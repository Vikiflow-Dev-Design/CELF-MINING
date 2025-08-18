const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const scholarshipController = require('../controllers/scholarshipController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

// Scholarship application validation
const scholarshipApplicationValidation = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('address').isObject().withMessage('Address information is required'),
  body('walletAddress').trim().isLength({ min: 20 }).withMessage('Valid CELF wallet address is required'),
  body('tokenBalance').isFloat({ min: 1000 }).withMessage('Minimum 1000 CELF tokens required'),
  
  // Educational information
  body('currentEducation').isObject().withMessage('Current education information is required'),
  body('academicRecords').isArray({ min: 1 }).withMessage('Academic records are required'),
  body('studyPlan').trim().isLength({ min: 100 }).withMessage('Study plan must be at least 100 characters'),
  body('careerGoals').trim().isLength({ min: 50 }).withMessage('Career goals must be at least 50 characters'),
  
  // Financial information
  body('financialNeed').trim().isLength({ min: 50 }).withMessage('Financial need description is required'),
  body('householdIncome').optional().isFloat({ min: 0 }),
  body('otherScholarships').optional().isArray(),
  
  // Essays and personal statement
  body('personalStatement').trim().isLength({ min: 200, max: 2000 }).withMessage('Personal statement must be between 200-2000 characters'),
  body('whyCELF').trim().isLength({ min: 100, max: 1000 }).withMessage('Why CELF essay must be between 100-1000 characters'),
  
  // References
  body('references').isArray({ min: 2, max: 3 }).withMessage('2-3 references are required'),
  
  // Documents
  body('documents').isObject().withMessage('Required documents must be provided')
];

// Document upload validation
const documentUploadValidation = [
  body('applicationId').notEmpty().withMessage('Application ID is required'),
  body('documentType').isIn(['id', 'transcript', 'enrollment', 'financial', 'other']).withMessage('Invalid document type'),
  body('fileName').trim().isLength({ min: 1 }).withMessage('File name is required'),
  body('fileSize').isInt({ min: 1 }).withMessage('File size is required'),
  body('mimeType').isIn(['application/pdf', 'image/jpeg', 'image/png']).withMessage('Invalid file type')
];

// Public routes
router.get('/programs', scholarshipController.getScholarshipPrograms);
router.get('/programs/:id', scholarshipController.getScholarshipProgramById);
router.get('/requirements', scholarshipController.getApplicationRequirements);

// Application submission
router.post('/apply', scholarshipApplicationValidation, validateRequest, scholarshipController.submitApplication);

// Document upload
router.post('/documents/upload', documentUploadValidation, validateRequest, scholarshipController.uploadDocument);

// Application status check
router.get('/application/status/:email', scholarshipController.getApplicationStatus);
router.get('/application/:id/status', scholarshipController.getApplicationStatusById);

// Authenticated routes
router.use(authenticate);

// User's scholarship applications
router.get('/my-applications', scholarshipController.getMyApplications);
router.get('/my-applications/:id', scholarshipController.getMyApplicationById);
router.put('/my-applications/:id', scholarshipController.updateMyApplication);

// Application documents management
router.get('/my-applications/:id/documents', scholarshipController.getMyApplicationDocuments);
router.delete('/documents/:documentId', scholarshipController.deleteDocument);

// Scholarship awards and disbursements
router.get('/my-awards', scholarshipController.getMyAwards);
router.get('/my-awards/:id/disbursements', scholarshipController.getMyDisbursements);

// Admin routes
router.use(authorize(['admin', 'scholarship_reviewer']));

// Application review and management
router.get('/applications', scholarshipController.getAllApplications);
router.get('/applications/:id', scholarshipController.getApplicationById);
router.put('/applications/:id/status', [
  body('status').isIn(['submitted', 'under_review', 'approved', 'rejected', 'waitlisted']).withMessage('Invalid status'),
  body('reviewNotes').optional().trim(),
  body('reviewerId').optional().notEmpty()
], validateRequest, scholarshipController.updateApplicationStatus);

// Application scoring and evaluation
router.post('/applications/:id/score', [
  body('criteria').isObject().withMessage('Scoring criteria required'),
  body('totalScore').isFloat({ min: 0, max: 100 }).withMessage('Total score must be between 0-100'),
  body('comments').optional().trim(),
  body('recommendation').isIn(['approve', 'reject', 'waitlist']).withMessage('Invalid recommendation')
], validateRequest, scholarshipController.scoreApplication);

// Award management
router.post('/awards', [
  body('applicationId').notEmpty().withMessage('Application ID is required'),
  body('amount').isFloat({ min: 100 }).withMessage('Award amount must be at least $100'),
  body('disbursementSchedule').isArray({ min: 1 }).withMessage('Disbursement schedule is required'),
  body('conditions').optional().isArray()
], validateRequest, scholarshipController.createAward);

router.get('/awards', scholarshipController.getAllAwards);
router.get('/awards/:id', scholarshipController.getAwardById);
router.put('/awards/:id/status', scholarshipController.updateAwardStatus);

// Disbursement management
router.post('/disbursements', [
  body('awardId').notEmpty().withMessage('Award ID is required'),
  body('amount').isFloat({ min: 1 }).withMessage('Disbursement amount is required'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('method').isIn(['bank_transfer', 'check', 'digital_wallet']).withMessage('Invalid disbursement method')
], validateRequest, scholarshipController.createDisbursement);

router.get('/disbursements', scholarshipController.getAllDisbursements);
router.put('/disbursements/:id/status', scholarshipController.updateDisbursementStatus);

// Scholarship program management
router.post('/programs', [
  body('name').trim().isLength({ min: 5 }).withMessage('Program name is required'),
  body('description').trim().isLength({ min: 50 }).withMessage('Program description is required'),
  body('eligibilityCriteria').isArray({ min: 1 }).withMessage('Eligibility criteria are required'),
  body('applicationDeadline').isISO8601().withMessage('Valid application deadline is required'),
  body('awardAmount').isFloat({ min: 100 }).withMessage('Award amount must be at least $100'),
  body('numberOfAwards').isInt({ min: 1 }).withMessage('Number of awards must be at least 1')
], validateRequest, scholarshipController.createScholarshipProgram);

router.put('/programs/:id', scholarshipController.updateScholarshipProgram);

// Analytics and reporting
router.get('/analytics/applications', scholarshipController.getApplicationAnalytics);
router.get('/analytics/awards', scholarshipController.getAwardAnalytics);
router.get('/analytics/disbursements', scholarshipController.getDisbursementAnalytics);

module.exports = router;
