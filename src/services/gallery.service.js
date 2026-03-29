const pool = require('../db');
const NodeCache = require("node-cache");

const galleryCache = new NodeCache({ stdTTL: 600 });

exports.getGallery = async () => {
  const cached = galleryCache.get('gallery');
  if (cached) return cached;

  const result = await pool.query('SELECT * FROM images');

  galleryCache.set('gallery', result.rows);

  return result.rows;
};

exports.getImageWithCaptions = async (id, limit, offset) => {
  const imageResult = await pool.query(
    'SELECT * FROM images WHERE id = $1',[id]
  );

  const captionsResult = await pool.query(
    `SELECT captions.id, captions.caption, users.username, captions.user_id,
      COUNT(likes.id) AS like_count
      FROM captions
      INNER JOIN users ON users.id = captions.user_id
      LEFT JOIN likes ON likes.captions_id = captions.id
      WHERE captions.image_id = $1
      GROUP BY captions.id, users.username, captions.user_id
      ORDER BY COUNT(likes.id) DESC
      LIMIT $2 OFFSET $3`,
    [id, limit, offset]
  );

  const totalResult = await pool.query(
    `SELECT COUNT(*) FROM captions WHERE image_id = $1`, [id]
  );

  return {
    image: imageResult.rows[0],
    captions: captionsResult.rows,
    totalResult: totalResult.rows[0].count
  };
};
