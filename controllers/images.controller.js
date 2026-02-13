const imageService = require('../services/image.service');

exports.showImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const result = await imageService.showImage(imageId);
    if (!result || !result.image) {
        return res.status(404).send('image not found :c');
    }
    
    res.render('image', { image: result.image, captions: result.captions });
    } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};
