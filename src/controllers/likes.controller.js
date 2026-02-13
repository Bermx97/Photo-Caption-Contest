const likeService = require('../services/like.service');

exports.like = async (req, res) => {
  const captionId = req.params.captionId;
  const userId = req.session.userId
  try {
    const alreadyLiked = await likeService.isAlreadyLiked(captionId, userId);
    if (alreadyLiked.rows.length > 0) {
      return res.status(400).json({ error: 'You already liked this comment' });
    }
    await likeService.addLike(captionId, userId);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}; 