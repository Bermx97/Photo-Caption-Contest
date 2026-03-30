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

describe('deleteLike', () => {
    it('should return success response after deleting like', async () => {
        pool.query.mockResolvedValue({
            command: 'DELETE',
            rowCount: 1,
            rows: [],
            fields: []
        });
        const result = await likeService.deleteLike(3, 5);
        expect(pool.query).toHaveBeenCalledWith('DELETE FROM likes WHERE captions_id = $1 AND user_id = $2', [3, 5]);
        expect(result).toEqual({
            command: 'DELETE',
            rowCount: 1,
            rows: [],
            fields: []
        });
    });
});

describe('countLikesForUser', () => {
    it('should return how many likes user have', async () => {
        pool.query.mockResolvedValue({ rows: { total_likes: 50 } });
        const result = await likeService.countLikesForUser(1);
        expect(pool.query).toHaveBeenCalledWith('SELECT COUNT(likes.id) AS total_likes FROM captions LEFT JOIN likes ON likes.captions_id = captions.id WHERE captions.user_id = $1', 
        [1]);
        expect(result).toEqual({ rows: { total_likes: 50 } });
    });
});