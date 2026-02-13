const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');


router.post('/',
    body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('username must be 3-20 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),
    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
    validateRequest, registerController.register
);

router.get('/', registerController.showRegisterPage);


module.exports = router;