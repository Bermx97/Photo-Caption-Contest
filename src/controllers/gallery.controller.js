const galleryService = require('../services/gallery.service');

exports.showGallery = async (req, res) => {
    const images = await galleryService.getGallery();
    if (!images || images.length === 0) {
      const error = new Error('Server error');
      error.status = 500;
      throw error;
    }
    res.render('gallery', { images });
};

exports.showImage = async (req, res) => {
    const { image, captions } = await galleryService.getImageWithCaptions(req.params.id);
    if (!image) {
      const error = new Error('Image not found');
      error.status = 404;
      throw error;
    }
    res.render('image', { image, captions, currentUserId: req.session.userId, currentUserRole: req.session.role });
};

