const likeService = require('../services/like.service');

exports.like = async (req, res) => {
  const captionId = req.params.captionId;
  const userId = req.session.userId;
  const alreadyLiked = await likeService.isAlreadyLiked(captionId, userId);
    if (alreadyLiked.rows.length > 0) {
      const error = new Error ('You already liked this comment');
      error.status = 400;
      throw error;
    }
    const addLike = await likeService.addLike(captionId, userId);
    if (!addLike) {
      const error = new Error('server error');
      error.status = 500;
      throw error;
    }
    res.json({ success: true });
}; 