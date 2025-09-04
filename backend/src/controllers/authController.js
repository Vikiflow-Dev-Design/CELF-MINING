const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mongodbService = require('../services/mongodbService');
const achievementService = require('../services/achievementService');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');
const { createResponse } = require('../utils/responseUtils');
const { createWalletData } = require('../utils/walletUtils');
const {
  validateRegistrationForm,
  validateLoginForm,
  sanitizeRegistrationData,
  sanitizeLoginData,
  formatValidationErrors,
  checkForSQLInjection
} = require('../utils/validation');

class AuthController {
  async register(req, res, next) {
    try {
      console.log('📥 Registration request received');
      console.log('📋 Request body:', JSON.stringify(req.body, null, 2));

      const { email, password, firstName, lastName, referralCode } = req.body;

      console.log('📝 Extracted fields:');
      console.log('  - email:', email);
      console.log('  - password:', password ? '[PROVIDED]' : '[MISSING]');
      console.log('  - firstName:', firstName);
      console.log('  - lastName:', lastName);
      console.log('  - referralCode:', referralCode || '[NONE]');

      // Sanitize input data
      const sanitizedData = sanitizeRegistrationData({ email, password, firstName, lastName });
      console.log('🧹 Sanitized data:', { ...sanitizedData, password: '[SANITIZED]' });

      // Check for SQL injection attempts
      const fieldsToCheck = [sanitizedData.email, sanitizedData.firstName, sanitizedData.lastName];
      for (const field of fieldsToCheck) {
        if (checkForSQLInjection(field)) {
          console.log('🚨 SQL injection attempt detected');
          return res.status(400).json(createResponse(false, 'Invalid input detected'));
        }
      }

      // Comprehensive validation
      const validation = validateRegistrationForm(
        sanitizedData.firstName,
        sanitizedData.lastName,
        sanitizedData.email,
        sanitizedData.password
      );

      if (!validation.isValid) {
        console.log('❌ Validation failed:', validation.errors);
        return res.status(400).json(createResponse(
          false,
          formatValidationErrors(validation.errors),
          { validationErrors: validation.errors }
        ));
      }

      console.log('✅ Validation passed');

      // Check if user already exists
      const existingUser = await mongodbService.findUserByEmail(sanitizedData.email);
      if (existingUser) {
        console.log('❌ User already exists with email:', sanitizedData.email);
        return res.status(400).json(createResponse(false, 'User already exists with this email'));
      }

      // Create user in database (password will be hashed by User model pre-save hook)
      const userData = {
        email: sanitizedData.email,
        password: sanitizedData.password, // Plain password - let the model hash it
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        role: 'user',
        isActive: true
      };

      console.log('🔐 Password will be hashed by User model pre-save hook');

      const user = await mongodbService.createUser(userData);

      // Generate referral code for new user
      const ReferralService = require('../services/referralService');
      await ReferralService.createReferralCodeForUser(user.id);

      // Create wallet for the user with secure address generation
      const walletData = createWalletData(user.id, user.email, 'Primary Wallet');

      // Add welcome bonus
      walletData.nonSendableBalance = 10; // 10 CELF welcome bonus for testing
      walletData.totalBalance = 10;

      const wallet = await mongodbService.createWallet(walletData);

      // Create a transaction record for the welcome bonus
      const Transaction = require('../models/Transaction');
      const welcomeTransaction = new Transaction({
        toUserId: user.id,
        amount: 10,
        type: 'bonus',
        status: 'completed',
        description: 'Welcome bonus - 10 CELF tokens for testing'
      });
      await welcomeTransaction.save();

      // Process referral if provided
      let referralBonus = 0;
      if (referralCode) {
        try {
          console.log(`🔗 Processing referral with code: ${referralCode}`);
          const referral = await ReferralService.processReferralSignup(user.id, referralCode, {
            source: 'mobile_app',
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
          });

          if (referral) {
            // Give referral rewards
            await ReferralService.giveReferralRewards(referral._id);
            referralBonus = referral.refereeReward.amount;
            console.log(`✅ Referral processed successfully. User gets ${referralBonus} CELF bonus`);
          }
        } catch (referralError) {
          console.error('❌ Referral processing failed:', referralError);
          // Don't fail registration if referral fails
        }
      }

      // Initialize achievements for the new user
      try {
        await achievementService.initializeUserAchievements(user.id);
        console.log('✅ Achievements initialized for new user');
      } catch (achievementError) {
        console.error('Error initializing achievements for new user:', achievementError);
        // Don't fail registration if achievement initialization fails
      }

      res.status(201).json(createResponse(true, 'User registered successfully', {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        referral: referralCode ? {
          processed: referralBonus > 0,
          bonus: referralBonus
        } : null
      }));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      console.log('📥 Login request received');
      const { email, password } = req.body;

      console.log('📝 Login attempt for email:', email);

      // Sanitize input data
      const sanitizedData = sanitizeLoginData({ email, password });

      // Check for SQL injection attempts
      if (checkForSQLInjection(sanitizedData.email)) {
        console.log('🚨 SQL injection attempt detected in login');
        return res.status(400).json(createResponse(false, 'Invalid input detected'));
      }

      // Comprehensive validation
      const validation = validateLoginForm(sanitizedData.email, sanitizedData.password);
      if (!validation.isValid) {
        console.log('❌ Login validation failed:', validation.errors);
        return res.status(400).json(createResponse(
          false,
          formatValidationErrors(validation.errors),
          { validationErrors: validation.errors }
        ));
      }

      console.log('✅ Login validation passed');

      // Find user by email
      const user = await mongodbService.findUserByEmail(sanitizedData.email);
      if (!user) {
        console.log('❌ User not found for email:', sanitizedData.email);
        return res.status(401).json(createResponse(false, 'Invalid email or password'));
      }

      // Check if user has a password field
      if (!user.password) {
        console.log('❌ User has no password field - account may need to be recreated');
        return res.status(401).json(createResponse(false, 'Account authentication error. Please contact support or recreate your account.'));
      }

      // Use the User model's built-in comparePassword method
      const isPasswordValid = await user.comparePassword(sanitizedData.password);

      if (!isPasswordValid) {
        console.log('❌ Invalid password for user:', sanitizedData.email);
        return res.status(401).json(createResponse(false, 'Invalid email or password'));
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json(createResponse(false, 'Account is deactivated'));
      }

      // Generate tokens
      const token = generateToken({ userId: user._id });
      const refreshToken = generateRefreshToken({ userId: user._id });

      // Update last login using the mongoose document method
      await user.updateLastLogin();

      res.json(createResponse(true, 'Login successful', {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive,
          lastLogin: new Date()
        },
        token,
        refreshToken
      }));
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      // Get user details from the authenticated request
      const { userId, email, role } = req.user;

      // Get full user details from database
      const user = await mongodbService.findUserById(userId);

      if (!user) {
        return res.status(401).json(createResponse(false, 'User not found'));
      }

      // In a production system, you might want to:
      // 1. Blacklist the current token
      // 2. Log the logout event
      // 3. Clear any active sessions

      console.log(`👋 User logged out: ${email} (ID: ${userId})`);

      res.json(createResponse(true, 'Logout successful', {
        loggedOutUser: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          logoutTime: new Date().toISOString()
        }
      }));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json(createResponse(false, 'Refresh token is required'));
      }

      const decoded = verifyRefreshToken(refreshToken);
      const user = await mongodbService.findUserById(decoded.userId);

      if (!user) {
        return res.status(401).json(createResponse(false, 'Invalid refresh token'));
      }

      const newToken = generateToken({ userId: user.id });
      const newRefreshToken = generateRefreshToken({ userId: user.id });

      res.json(createResponse(true, 'Token refreshed successfully', {
        token: newToken,
        refreshToken: newRefreshToken
      }));
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      // Mock forgot password (authentication disabled)
      res.json(createResponse(true, 'Password reset email sent (mock response)'));
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;

      // Mock password reset (authentication disabled)
      res.json(createResponse(true, 'Password reset successful (mock response)'));
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;

      // Mock email verification (authentication disabled)
      res.json(createResponse(true, 'Email verified successfully (mock response)'));
    } catch (error) {
      next(error);
    }
  }

  async resendVerification(req, res, next) {
    try {
      const { email } = req.body;

      // Mock resend verification (authentication disabled)
      res.json(createResponse(true, 'Verification email sent (mock response)'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
