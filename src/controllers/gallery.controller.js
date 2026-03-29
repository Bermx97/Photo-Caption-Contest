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
    let page = Number(req.query.page) || 1;
    if (page < 1) page = 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const { image, captions, totalResult } = await galleryService.getImageWithCaptions(req.params.id, limit, offset);
    if (!image) {
      const error = new Error('Image not found');
      error.status = 404;
      throw error;
    }
    const totalPage = Math.ceil(totalResult / limit);
    if (page > totalPage && totalPage > 0) {
      return res.redirect(`/gallery/${req.params.id}?page=${totalPage}`);
    }
    res.render('image', { image, captions, currentUserId: req.session.userId, currentUserRole: req.session.role, page, totalPage });
};
