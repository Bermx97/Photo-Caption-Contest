const pool = require('../db');

exports.findUser = async (wanted) => {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [wanted]);
    return user
};
