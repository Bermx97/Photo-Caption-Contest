const pool = require('../db');

exports.createCaption = async (newcaption, userId, imageId) => {
    const result = await pool.query('INSERT INTO captions (caption, user_id, image_id) VALUES ($1, $2, $3) RETURNING *', [newcaption, userId, imageId]);
    return result.rows[0] || null;
};

exports.editCaption = async (newcaption, captionId) => {
    const result = await pool.query('UPDATE captions SET caption = $1 WHERE id = $2 RETURNING *' , [newcaption, captionId])
    return result;
}