const captionService = require('../services/caption.service');

exports.addCaption = async (req, res) => {
    try {
    const imageId = req.params.id;
    const newcaption = req.body.newcaption;
    const userId = req.session.userId
    const result = await captionService.createCaption(newcaption, userId, imageId);
    if (result.rowCount === 0) {
      return res.status(500).send('server error');
    } 
      res.status(200).json({ message: 'caption added', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
};