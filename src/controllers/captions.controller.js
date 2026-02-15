const captionService = require('../services/caption.service');

exports.addCaption = async (req, res) => {
    const imageId = req.params.id;
    const newcaption = req.body.newcaption;
    const userId = req.session.userId
    const result = await captionService.createCaption(newcaption, userId, imageId);
    if (result.rowCount === 0) {
      const error = new Error('server error')
      error.status = 500;
      throw error;
    } 
      res.status(201).json({ message: 'caption added', data: result });
};

