const pool = require('../db');

exports.isAlreadyLiked = async (captionId, userId) => {
    const result = await pool.query(
      'SELECT 1 FROM likes WHERE captions_id = $1 AND user_id = $2',
      [captionId, userId]
    );
    return result
};

exports.addLike = async (captionId, userId) => {
    return await pool.query(
      'INSERT INTO likes (captions_id, user_id) VALUES ($1, $2)',
      [captionId, userId]
    );
};