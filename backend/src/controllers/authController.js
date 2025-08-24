const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const supabaseService = require('../services/supabaseService');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');
const { createResponse } = require('../utils/responseUtils');
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

      const { email, password, firstName, lastName } = req.body;

      console.log('📝 Extracted fields:');
      console.log('  - email:', email);
      console.log('  - password:', password ? '[PROVIDED]' : '[MISSING]');
      console.log('  - firstName:', firstName);
      console.log('  - lastName:', lastName);

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
      const existingUser = await supabaseService.findUserByEmail(sanitizedData.email);
      if (existingUser) {
        console.log('❌ User already exists with email:', sanitizedData.email);
        return res.status(400).json(createResponse(false, 'User already exists with this email'));
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(sanitizedData.password, saltRounds);
      console.log('🔐 Password hashed successfully');

      // Create user in database
      const userData = {
        email: sanitizedData.email,
        password: hashedPassword,
        first_name: sanitizedData.firstName,
        last_name: sanitizedData.lastName,
        role: 'user',
        is_active: true
      };

      const user = await supabaseService.createUser(userData);

      // Create wallet for the user
      const walletData = {
        user_id: user.id,
        sendable_balance: 0, // No registration bonus
        non_sendable_balance: 0,
        pending_balance: 0,
        current_address: `celf${Math.random().toString(36).substr(2, 40)}`,
        addresses: JSON.stringify([{
          address: `celf${Math.random().toString(36).substr(2, 40)}`,
          label: 'Main Wallet',
          isDefault: true
        }])
      };

      await supabaseService.createWallet(walletData);

      res.status(201).json(createResponse(true, 'User registered successfully', {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        }
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
      const user = await supabaseService.findUserByEmail(sanitizedData.email);
      if (!user) {
        console.log('❌ User not found for email:', sanitizedData.email);
        return res.status(401).json(createResponse(false, 'Invalid email or password'));
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(sanitizedData.password, user.password);
      if (!isPasswordValid) {
        console.log('❌ Invalid password for user:', sanitizedData.email);
        return res.status(401).json(createResponse(false, 'Invalid email or password'));
      }

      // Check if user is active
      if (!user.is_active) {
        return res.status(401).json(createResponse(false, 'Account is deactivated'));
      }

      // Generate tokens
      const token = generateToken({ userId: user.id });
      const refreshToken = generateRefreshToken({ userId: user.id });

      // Update last login
      await supabaseService.updateUser(user.id, { last_login: new Date().toISOString() });

      res.json(createResponse(true, 'Login successful', {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
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
      const user = await supabaseService.findUserById(userId);

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
      const user = await supabaseService.findUserById(decoded.userId);

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
