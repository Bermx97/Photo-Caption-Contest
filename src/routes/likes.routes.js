const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/:captionId', isAuthenticated, likesController.like)

module.exports = router;