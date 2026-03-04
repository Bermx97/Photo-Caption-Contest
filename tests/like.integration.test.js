const request = require('supertest');
const app = require('../app');
const likeService = require('../src/services/like.service');
const pool = require('../src/db');
const bcrypt = require('bcrypt');

jest.mock('../src/services/like.service');

describe('POST /likes/:captionId', () => {

    let agent;
    let testUserId;
    const testPassword = '123456';
    const testUsername = 'testuser_' + Math.floor(Math.random() * 1000000);
    const testCaption = 'TEST_CAPTION_' + Date.now();
    beforeAll(async () => {

        agent = request.agent(app);
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [testUsername, hashedPassword]
        );

        testUserId = result.rows[0].id;

        await agent
            .post('/login')
            .send({ username: testUsername, password: testPassword });
    });

    afterAll(async () => {
        await pool.query('DELETE FROM captions WHERE caption = $1', [testCaption]);
        await pool.query('DELETE FROM users WHERE id = $1',[testUserId]);
        await pool.end();
    });

    it('should return 204 and delete like if user already liked this comment', async () => {
        likeService.isAlreadyLiked.mockResolvedValue({
            command: 'SELECT',
            rowCount: 1,
            rows: [{ '?column?': 1 }]
        })
        const response = await agent.post('/likes/3');
        expect(response.status).toBe(204);
    });

    it('should return 201 if the user added a like correctly', async () => {
        likeService.isAlreadyLiked.mockResolvedValue( { rows: [] } );
        likeService.addLike.mockResolvedValue({ rows: [{ id: 1, captions_id: 32, user_id: testUserId }] });
        const response = await agent.post('/likes/32')
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true });
    })
});
