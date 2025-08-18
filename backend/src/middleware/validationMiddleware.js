const { validationResult } = require('express-validator');
const { createResponse } = require('../utils/responseUtils');

// Validation middleware
const validateRequest = (req, res, next) => {
  console.log('🔍 Validation middleware - Request body:', JSON.stringify(req.body, null, 2));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('❌ Validation errors found:', errors.array());

    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    return res.status(400).json(createResponse(false, 'Validation failed', null, {
      errors: errorMessages
    }));
  }

  console.log('✅ Validation passed');
  next();
};

module.exports = {
  validateRequest
};
