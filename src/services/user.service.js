const pool = require('../db');

exports.getUserCaptions = async (userId) => {
    const result = await pool.query(
    `SELECT * FROM captions WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};

exports.editUsername = async (username, newUsername) => {
  const result = await pool.query(
    `UPDATE users SET username = $1 WHERE username = $2 RETURNING username`, [newUsername, username]
  );
  return result;
};

exports.editPassword = async (username, newHashedPassword) => {
  const result = await pool.query('UPDATE users SET password = $1 WHERE username = $2', [newHashedPassword, username]
  );
  return result
};

exports.searchUsers = async (username) => {
  const result = await pool.query('SELECT username FROM users WHERE username ILIKE $1', [`${username}%`]);
  return result.rows
};
