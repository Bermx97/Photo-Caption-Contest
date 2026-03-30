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