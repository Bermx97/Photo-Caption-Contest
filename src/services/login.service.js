const pool = require('../db');

exports.findUser = async (username) => {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return user
};
