const pool = require('../db');

exports.getUserCaptions = async (userId) => {
    const result = await pool.query(
    `SELECT * FROM captions WHERE user_id = $1`,
    [userId]
  );
  return result.rows
}