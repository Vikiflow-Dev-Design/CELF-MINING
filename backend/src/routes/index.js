const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const miningRoutes = require('./miningRoutes');
const walletRoutes = require('./walletRoutes');
const contactRoutes = require('./contactRoutes');
const newsletterRoutes = require('./newsletterRoutes');
const mentorshipRoutes = require('./mentorshipRoutes');
const scholarshipRoutes = require('./scholarshipRoutes');
const adminRoutes = require('./adminRoutes');

// API version and welcome message
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CELF API',
    version: '1.0.0',
    status: 'Authentication enabled - JWT required for protected endpoints',
    authentication: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      refreshToken: 'POST /api/auth/refresh-token'
    },
    endpoints: {
      // Mobile app endpoints
      auth: '/api/auth',
      users: '/api/users',
      mining: '/api/mining',
      wallet: '/api/wallet',
      // Website endpoints
      contact: '/api/contact',
      newsletter: '/api/newsletter',
      mentorship: '/api/mentorship',
      scholarship: '/api/scholarship',
      // Admin endpoints
      admin: '/api/admin'
    }
  });
});

// Mobile app routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/mining', miningRoutes);
router.use('/wallet', walletRoutes);

// Website routes
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/mentorship', mentorshipRoutes);
router.use('/scholarship', scholarshipRoutes);

// Admin routes
router.use('/admin', adminRoutes);

module.exports = router;
