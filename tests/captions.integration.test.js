const request = require('supertest');
const app = require('../app');
const pool = require('../src/db');
const bcrypt = require('bcrypt');

describe('POST /caption/:id', () => {
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
        await pool.query(
            'DELETE FROM captions WHERE caption = $1',
            [testCaption]
        );

        await pool.query(
            'DELETE FROM users WHERE id = $1',
            [testUserId]
        );

        await pool.end();
    });

    it('should return 401 if user is not logged in', async () => {
        const response = await request(app)
        .post('/caption/lolek')
        .send({ newcaption: 'Test caption' });
         expect(response.status).toBe(401);
         expect(response.body.message).toBe('Please log in to do this.');
    });

    it('should return 201 and add the caption if the user is logged in', async () => {
        const response = await agent
        .post('/caption/lolek')
        .send({ newcaption: testCaption})
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('caption added');
    });
    
    it('should return 400 if newcaption is empty', async () => {
        const response = await agent
        .post('/caption/lolek')
        .send({ newcaption: ''});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Caption must be between 1 and 130 characters long');
    });
});
