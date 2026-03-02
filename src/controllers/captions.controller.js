const captionService = require('../services/caption.service');

exports.addCaption = async (req, res) => {
    const imageId = req.params.id;
    const newcaption = req.body.newcaption;
    const userId = req.session.userId
    const result = await captionService.createCaption(newcaption, userId, imageId);
    if (result.rowCount === 0) {
      const error = new Error('Server error')
      error.status = 500;
      throw error;
    } 
      res.status(201).json({ message: 'Caption added', data: result });
};

exports.editCaption = async (req, res) => {
  const userId = req.session.userId;
  const newcaption = req.body.newcaption;
  const captionId = req.params.id;
  const captionUserId = await captionService.getCaptionUserId(captionId);
  const role = req.session.role; 

  if (captionUserId.user_id !== userId && role === 'user') {
    const error = new Error ('You can only edit your captions');
    error.status = 403;
    throw error;
  };

  const result = await captionService.editCaption(newcaption, captionId);

  if (result.rowCount === 0) {
    const error = new Error('Server error');
    error.status = 500;
    throw error;
  };
  res.status(200).json({ message: 'Caption edited' });
};

exports.deleteCaption = async (req, res) => {
  const userId = req.session.userId;
  const captionId = req.params.id;
  const captionUserId = await captionService.getCaptionUserId(captionId);
  const role = req.session.role;
  if (captionUserId.user_id !== userId && role === 'user') {
    const error = new Error ('You can only delete your captions');
    error.status = 403;
    throw error;
  };
  const result = await captionService.deleteCaption(captionId);
  if (result.rowCount === 0) {
    const error = new Error('Server error');
    error.status = 500;
    throw error;
  };
  res.status(204).send();
};
