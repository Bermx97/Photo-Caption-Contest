const express = require('express');
const router = express.Router();
const captionsController = require('../controllers/captions.controller');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/:id', isAuthenticated,
  body('newcaption')
  .trim()
  .isLength({ min: 1, max: 130 })
  .withMessage('Caption must be between 1 and 130 characters long')
  .matches(/^[\p{L}\p{N}\p{P}\p{S}\p{Zs}]+$/u)
  .withMessage('Comment contains invalid characters')
  .custom((value) => {
    if (/[\n\r\t]/.test(value)) {
      throw new Error('Caption cannot contain line breaks or tabs');
    }
    return true;
  }),
  validateRequest, 
  captionsController.addCaption
);

module.exports = router;