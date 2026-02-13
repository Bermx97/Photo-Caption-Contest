const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/images.controller');

router.get('/:id', imagesController.showImage);

module.exports = router;