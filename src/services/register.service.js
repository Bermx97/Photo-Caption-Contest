const pool = require('../db');

exports.findUser = async (username) => {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return user;
};

exports.createUser = async (username, hashedPassword) => {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    return result;
};