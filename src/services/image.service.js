const pool = require('../db');

exports.showImage = async (imageId) => {
    const imageResult = await pool.query('SELECT * FROM images WHERE id = $1', [imageId]);
    if (imageResult.rows.length === 0) {
        return null;
    }

    const image = imageResult.rows[0];

    const captionsResult = await pool.query(`
    SELECT 
      captions.id, 
      captions.caption, 
      captions.image_id, 
      users.username,
      COUNT(likes.id) AS like_count
    FROM captions
    INNER JOIN users ON users.id = captions.user_id
    LEFT JOIN likes ON likes.captions_id = captions.id
    WHERE captions.image_id = $1
    GROUP BY captions.id, users.username
    ORDER BY COUNT(likes.id) DESC
  `, [imageId]);
  return {
    image,
    captions: captionsResult.rows
  };
};
