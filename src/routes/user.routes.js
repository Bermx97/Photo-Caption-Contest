const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { body, query } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');


router.get('/search',
    query('username')
    .isLength({ min: 1, max: 20 })
    .withMessage('Query must be between 1 and 20 characters'),
    userController.searchUsers);

router.get('/:id', userController.showUser);

router.patch('/edit-nickname',
    body('newNickname')
    .isLength({ min: 3, max: 20 })
    .withMessage('username must be 3-20 characters long')
    .matches(/^[a-zA-Z0-9ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]+$/)
    .withMessage('Username must contain only letters and numbers'),
    validateRequest, isAuthenticated, userController.editUsername);

router.patch('/edit-password',
    body('currentPassword')
    .isLength({ min: 6, max: 25 })
    .withMessage('Password must be at least 6-25 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
    body('newPassword')
    .isLength({ min: 6, max: 25 })
    .withMessage('Password must be at least 6-25 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
    validateRequest, isAuthenticated, userController.editPassword);

module.exports = router;