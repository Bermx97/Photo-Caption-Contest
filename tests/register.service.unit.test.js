const pool = require('../src/db');
const registerService = require('../src/services/register.service');

jest.mock('../src/db');

describe('createUser', () => {
    it('should add user into database and return id and username', async () => {
        pool.query.mockResolvedValue({ rows: [{ id: 11, username: 'Testuser' }] });
        const result = await registerService.createUser('Testuser', 'hashedPassword');
        expect(pool.query).toHaveBeenCalledWith('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', ['Testuser', 'hashedPassword']);
        expect(result).toEqual({ id: 11, username: 'Testuser' });
    });
});