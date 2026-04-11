const request = require('supertest');
const app = require('../app');
const pool = require('../src/db');
const bcrypt = require('bcrypt');

let agent;
let testUserId;
const testPassword = '123456';
const testUsername = 'testuser' + Math.floor(Math.random() * 1000000);

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

describe('GET /user/:id', () => {

    it('should return 404 if user do not exist', async () => {
        const response = await request(app)
        .get('/user/Ł')
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });
    
    it('should return 200 when user exists', async () => {
        const response = await request(app)
        .get('/user/Łukasz')
        expect(response.status).toBe(200);
    });
});

describe('PATCH /user/edit-nickname', () => {

    it('should return 401 if user is not logged', async () => {
        const response = await request(app)
        .patch('/user/edit-nickname')
        .send({ newNickname: 'test' });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Please log in to do this.');
    });
    
    it('should return 404 if User is not found', async () => {
        const agent404 = request.agent(app);

        await agent404
        .post('/register')
        .send({ username: 'Test404', password: 'Test404' });

        await agent404
        .post('/login')
        .send({ username: 'Test404', password: 'Test404' });

        await pool.query('DELETE FROM users WHERE username = $1',['Test404']);
        const response = await agent404
        .patch('/user/edit-nickname')
        .send({ newNickname: 'test' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return 400 if Username already taken', async () => {
        const response = await agent
        .patch('/user/edit-nickname')
        .send({ newNickname: 'Admin' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username already taken');
    });

    it('should return 200 if the username change is successful', async () => {
        const response = await agent
        .patch('/user/edit-nickname')
        .send({ newNickname: `new${testUsername}` });
        expect(response.status).toBe(200);
        expect(response.body.nickname).toBe(`new${testUsername}`);
    });
}); 

afterAll(async () => {
    await pool.query(
        'DELETE FROM users WHERE id = $1',
        [testUserId]
    );
    await pool.end();
});

