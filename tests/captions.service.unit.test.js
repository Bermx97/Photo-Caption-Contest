const mockPool = require('../src/db');
const captionsService = require('../src/services/caption.service');
jest.mock('../src/db');

describe('createCaption', () => {
    beforeEach(() => {
        jest.clearAllMocks();
  });
    it('should return result rows from database after create caption', async () => {
        mockPool.query.mockResolvedValue({
            rows: [{ id: 1, caption: 'test caption', user_id: 1, image_id: 'test'}]
        });
        const result = await captionsService.createCaption('test caption', 1, 'test');
        expect(mockPool.query).toHaveBeenCalledWith('INSERT INTO captions (caption, user_id, image_id) VALUES ($1, $2, $3) RETURNING *', ['test caption', 1, 'test']);
        expect(result).toEqual({ id: 1, caption: 'test caption', user_id: 1, image_id: 'test' });
    });
});

describe('getCaptionUserId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
  });
    it('should return caption_user_id', async () => {
        mockPool.query.mockResolvedValue({ rows: [{ user_id: 5 }] });
        const result = await captionsService.getCaptionUserId(6);
        expect(mockPool.query).toHaveBeenCalledWith('SELECT user_id from captions WHERE id = $1', [6]);
        expect(result).toEqual({ user_id: 5 });
    });
});

describe('editCaption', () => {
    beforeEach(() => {
        jest.clearAllMocks();
  });
    it('should edit caption', async () => {
        mockPool.query.mockResolvedValue({ rows: [{ 
            id: 7, caption: 'newTestCaption', user_id: 8, image_id: 'test'
        }]});
        const result = await captionsService.editCaption('newTestCaption', 7)
        expect(mockPool.query).toHaveBeenCalledWith('UPDATE captions SET caption = $1 WHERE id = $2 RETURNING *' , ['newTestCaption', 7]);
        expect(result.rows[0]).toEqual({ id: 7, caption: 'newTestCaption', user_id: 8, image_id: 'test' });
    });
});

describe('deleteCaption', () => {
    beforeEach(() => {
        jest.clearAllMocks();
  });
    it('should delete caption', async () => {
        mockPool.query.mockResolvedValue({ rows: [{ 
            id: 8, caption: 'testing', user_id: 3, image_id: 'lolek'
        }]});
        const result = await captionsService.deleteCaption(8);
        expect(mockPool.query).toHaveBeenCalledWith('DELETE FROM captions WHERE id = $1', [8]);
        expect(result.rows[0]).toEqual({ id: 8, caption: 'testing', user_id: 3, image_id: 'lolek' });
    });
});