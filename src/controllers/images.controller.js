const imageService = require('../services/image.service');

exports.showImage = async (req, res) => {
        const imageId = req.params.id;
        const result = await imageService.showImage(imageId);
    if (!result || !result.image) {
        const error = new Error('image not found :c');
        error.status = 404;
        throw error;
    }
    res.render('image', { image: result.image, captions: result.captions });
};
