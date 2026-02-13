const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');

router.get('/', galleryController.showGallery);
router.get('/:id', galleryController.showImage);

module.exports = router;