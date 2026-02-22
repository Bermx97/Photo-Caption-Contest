const pool = require('../src/db');
const galleryService = require('../src/services/gallery.service');

jest.mock('../src/db');


describe('getGallery', () => {
    beforeEach(() => {
        jest.clearAllMocks();
  });
    it('should return rows from database if no cache', async () => {
        pool.query.mockResolvedValue({
            rows: [{ id: 'test', filename: '/test.jpg'}]
        })
    const result = await galleryService.getGallery();
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM images');
    expect(result).toEqual([{ id: 'test', filename: '/test.jpg' }]);
    });
});

describe('getImageWithCaptions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
  });
  it('should return image row and captions rows from database', async () => {
    pool.query
    .mockResolvedValueOnce({
        rows: [{ id: 'test', filename: 'test.jpg' }]
    })
    .mockResolvedValueOnce({
        rows: [{ id: 'test', caption: 'testcaption', username: 'testUser', like_count: 4 }]
    })
    const id = 'test'
    const result = await galleryService.getImageWithCaptions(id);
    expect(pool.query).toHaveBeenNthCalledWith(1, 'SELECT * FROM images WHERE id = $1', ['test']);
    expect(pool.query).toHaveBeenNthCalledWith(2,
    `SELECT captions.id, captions.caption, users.username, captions.user_id,
      COUNT(likes.id) AS like_count
      FROM captions
      INNER JOIN users ON users.id = captions.user_id
      LEFT JOIN likes ON likes.captions_id = captions.id
      WHERE captions.image_id = $1
      GROUP BY captions.id, users.username, captions.user_id
      ORDER BY COUNT(likes.id) DESC`,
    ['test']);     
    expect(result).toEqual({ 
        image: { id: 'test', filename: 'test.jpg' },
        captions: [{ id: 'test', caption: 'testcaption', username: 'testUser', like_count: 4 }]
    });   
  });
});