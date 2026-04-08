const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');


router.get('/:id', userController.showUser);

router.patch('/edit-nickname',
    body('newNickname')
    .isLength({ min: 3, max: 20 })
    .withMessage('username must be 3-20 characters long')
    .matches(/^[a-zA-Z0-9ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]+$/)
    .withMessage('Username must contain only letters and numbers'),
    validateRequest, isAuthenticated, userController.editUsername);


module.exports = router;