const pool = require('../db');

exports.createCaption = async (newcaption, userId, imageId) => {
    const result = await pool.query('INSERT INTO captions (caption, user_id, image_id) VALUES ($1, $2, $3) RETURNING *', [newcaption, userId, imageId]);
    return result.rows[0] || null;
};
