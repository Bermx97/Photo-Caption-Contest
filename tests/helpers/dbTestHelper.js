const pool = require('../../src/db');

let client;

const setupTestDb = async () => {
    client = await pool.connect();
    await client.query('BEGIN');
    return client;
};

const teardownTestDb = async () => {
    await client.query('ROLLBACK');
    client.release();
};

module.exports = {
    setupTestDb, teardownTestDb
};
