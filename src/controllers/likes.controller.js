const likeService = require('../services/like.service');

exports.like = async (req, res) => {
  const captionId = req.params.captionId;
  const userId = req.session.userId;
  const alreadyLiked = await likeService.isAlreadyLiked(captionId, userId);
    if (alreadyLiked.rows.length > 0) {
      const deleteLike = await likeService.deleteLike(captionId, userId);
      res.status(204).end();
    }
    if (alreadyLiked.rows.length === 0) {
      const addLike = await likeService.addLike(captionId, userId);
      if (!addLike || addLike.rowCount === 0) {
      const error = new Error('server error');
      error.status = 500;
      throw error;
    }
      res.status(201);
      res.json({ success: true });
    }
}; 