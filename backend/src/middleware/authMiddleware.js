const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mongodbService = require('../services/mongodbService');
const { createResponse } = require('../utils/responseUtils');

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(createResponse(false, 'Access token is required'));
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, config.jwt.secret);

      // Check if user still exists
      const user = await mongodbService.findUserById(decoded.userId);
      if (!user) {
        return res.status(401).json(createResponse(false, 'User no longer exists'));
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json(createResponse(false, 'User account is deactivated'));
      }

      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      console.log('🔐 Authentication: User authenticated:', {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });

      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json(createResponse(false, 'Token expired'));
      }
      return res.status(401).json(createResponse(false, 'Invalid token'));
    }
  } catch (error) {
    return res.status(500).json(createResponse(false, 'Authentication error'));
  }
};

// Authorization middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(createResponse(false, 'Authentication required'));
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json(createResponse(false, 'Insufficient permissions'));
    }

    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await mongodbService.findUserById(decoded.userId);

      if (user && user.isActive) {
        req.user = {
          userId: user.id,
          email: user.email,
          role: user.role
        };
      }
    } catch (jwtError) {
      // Ignore JWT errors in optional auth
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth
};
