const mockPool = require('../src/db');
const captionsService = require('../src/services/caption.service');
jest.mock('../src/db');

describe('createCaption', () => {
    it('should return result rows from database after create caption', async () => {
        mockPool.query.mockResolvedValue({
            rows: [{ id: 1, caption: 'test caption', user_id: 1, image_id: 'test'}]
        });
        const result = await captionsService.createCaption('test caption', 1, 'test');
        expect(mockPool.query).toHaveBeenCalledWith('INSERT INTO captions (caption, user_id, image_id) VALUES ($1, $2, $3) RETURNING *', ['test caption', 1, 'test']);
        expect(result).toEqual({ id: 1, caption: 'test caption', user_id: 1, image_id: 'test' });
    });
});