const pool = require('../src/db');
const loginService = require('../src/services/login.service');

jest.mock('../src/db');

describe('findUser', () => {
    it('should return user data from database', async () => {
        pool.query.mockResolvedValue({ id: 15, username: 'Testuser', password: 'hashedpassword' });
        const result = await loginService.findUser('Testuser');
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1', ['Testuser']);
        expect(result).toEqual({ id: 15, username: 'Testuser', password: 'hashedpassword' });
    });
});