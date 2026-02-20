const pool = require('../db');

exports.createUser = async (username, hashedPassword) => {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [username, hashedPassword]);
    return result.rows[0];
};