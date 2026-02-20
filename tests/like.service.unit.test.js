const pool = require('../src/db');
const likeService = require('../src/services/like.service');

jest.mock('../src/db');

describe('isAlreadyLiked', () => {
    it('should return 1 when user already liked caption', async () => {
        pool.query.mockResolvedValue(
            { '?column?': 1 }
        );
        const result = await likeService.isAlreadyLiked(2, 3);
        expect(pool.query).toHaveBeenCalledWith('SELECT 1 FROM likes WHERE captions_id = $1 AND user_id = $2', [2, 3]);
        expect(result).toEqual({ '?column?': 1 });
    });
});

describe('addLike', () => {
    it('should return info about added row', async () => {
        pool.query.mockResolvedValue({
            command: 'INSERT', 
            rowCount: 1, 
            oid: 0, 
            rows: []
        });
        const result = await likeService.addLike(3, 5);
        expect(pool.query).toHaveBeenCalledWith('INSERT INTO likes (captions_id, user_id) VALUES ($1, $2)', [3, 5]);
        expect(result).toEqual({ 
            command: 'INSERT',
            rowCount: 1, 
            oid: 0, 
            rows: []
        });
    });
});