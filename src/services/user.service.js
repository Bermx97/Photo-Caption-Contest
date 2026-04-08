const pool = require('../db');

exports.getUserCaptions = async (userId) => {
    const result = await pool.query(
    `SELECT * FROM captions WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};

exports.editUsername = async (user, newUsername) => {
  const result = await pool.query(
    `UPDATE users SET username = $1 WHERE username = $2 RETURNING username`, [newUsername, user]
  );
  return result;
};