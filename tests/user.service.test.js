const pool = require('../src/db');
const userService = require('../src/services/user.service');

jest.mock('../src/db');

describe('getUserCaptions', () => {
    it('should return user captions', async () => {
        pool.query.mockResolvedValue(
            { rows: [
                { id: 5, caption: 'test', user_id: 2, image_id: 7 },
                { id: 7, caption: 'hehe', user_id: 2, image_id: 1 }
            ]
        });
        const result = await userService.getUserCaptions(2);
        expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM captions WHERE user_id = $1`, [2]);
        expect(result).toEqual([
            { id: 5, caption: 'test', user_id: 2, image_id: 7 },
            { id: 7, caption: 'hehe', user_id: 2, image_id: 1 }   
        ]);
    });
});

describe('editUsername', () => {
    it('should update username and respond with new username', async () => {
        pool.query.mockResolvedValue(
            { rows: { nickname: 'newUsername' } }
        );
        const result = await userService.editUsername('oldUsername', 'newUsername')
        expect(pool.query).toHaveBeenCalledWith(`UPDATE users SET username = $1 WHERE username = $2 RETURNING username`, ['newUsername', "oldUsername"]);
        expect(result).toEqual({ rows: { nickname: 'newUsername' } });
    });
});

describe('editPassword', () => {
    it('should update password successfully', async () => {
        pool.query.mockResolvedValue({ rowCount: 1 });
        const result = await userService.editPassword('username', 'newHashedPassword');
        expect(pool.query).toHaveBeenCalledWith('UPDATE users SET password = $1 WHERE username = $2', ['newHashedPassword', 'username']);
        expect(result.rowCount).toBe(1);
    });
});