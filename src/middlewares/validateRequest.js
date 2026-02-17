const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());  
    return res.status(400).json({ errors: errors.array(), success: false,
      message: errors.array()[0].msg });
  }
  next();
};

module.exports = validateRequest;