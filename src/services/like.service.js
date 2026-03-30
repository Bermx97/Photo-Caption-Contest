const pool = require('../db');

exports.isAlreadyLiked = async (captionId, userId) => {
  return await pool.query(
    'SELECT 1 FROM likes WHERE captions_id = $1 AND user_id = $2',
    [captionId, userId]
  );
};

exports.addLike = async (captionId, userId) => {
  return await pool.query(
    'INSERT INTO likes (captions_id, user_id) VALUES ($1, $2)',
    [captionId, userId]
  );
};

exports.deleteLike = async (captionId, userId) => {
  return await pool.query(
    'DELETE FROM likes WHERE captions_id = $1 AND user_id = $2',
    [captionId, userId]
  );
};

//test
exports.countLikesForUser = async (userId) => {
  return await pool.query('SELECT COUNT(likes.id) AS total_likes FROM captions LEFT JOIN likes ON likes.captions_id = captions.id WHERE captions.user_id = $1', 
  [userId]);
};
