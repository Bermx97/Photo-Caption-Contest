const galleryService = require('../services/gallery.service');

exports.showGallery = async (req, res) => {
  try {
    const images = await galleryService.getGallery();
    res.render('gallery', { images });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};

exports.showImage = async (req, res) => {
  try {
    const image = await galleryService.getImageById(req.params.id);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.render('image', { image });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};

exports.showImage = async (req, res) => {
  try {
    const { image, captions } = await galleryService.getImageWithCaptions(req.params.id);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.render('image', { image, captions });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};

