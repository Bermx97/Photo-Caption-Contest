const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

router.post('/',
    body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('username must be 3-20 characters long'),
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
    validateRequest, loginController.login);

module.exports = router;