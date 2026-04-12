const request = require('supertest');
const app = require('../app');
const pool = require('../src/db');
const bcrypt = require('bcrypt');

let agent;
let testUserId;
const testPassword = '123456';
const testUsername = 'testuser' + Math.floor(Math.random() * 1000000);
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



describe('POST /caption/:id', () => {

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
        .send({ newcaption: 'testCaption' })
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Caption added');
    });
    
    it('should return 400 if newcaption is empty', async () => {
        const response = await agent
        .post('/caption/lolek')
        .send({ newcaption: ''});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Caption must be between 1 and 130 characters long');
    });
});

describe('PATCH /caption/:id', () => {

    it('should return 401 if user is not logged in', async () => {
        const response = await request(app)
        .patch('/caption/5')
        .send({ newcaption: 'Test caption' });
         expect(response.status).toBe(401);
         expect(response.body.message).toBe('Please log in to do this.');
    });

    it('should return 400 if newcaption is empty', async () => {
        const response = await agent
        .patch('/caption/1')
        .send({ newcaption: ''});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Caption must be between 1 and 130 characters long');
    });

    it('should return 403 if the user tries to edit a comment that is not theirs', async () => {
        const response = await agent
        .patch('/caption/1')
        .send({ newcaption: 'testing' });
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('You can only edit your captions');
    });

    it('should return 200 if the edit was successful', async () => {
        const createCaption = await agent
        .post('/caption/lolek')
        .send({ newcaption: 'orginal' })
        expect(createCaption.status).toBe(201);
        
        const newCaptionId = createCaption.body.data.id;

        const editCaption = await agent
        .patch(`/caption/${newCaptionId}`)
        .send({ newcaption: 'edit' });
        expect(editCaption.status).toBe(200);
        expect(editCaption.body.message).toBe('Caption edited');
    });
});

describe('DELETE /caption/:id', () => {
    it('should return 200 if the delete was successful', async () => {
        const createCaption = await agent
        .post('/caption/lolek')
        .send({ newcaption: 'deletetest' });
        expect(createCaption.status).toBe(201);
        
        const newCaptionId = createCaption.body.data.id;
        
        const deleteCaption = await agent
        .delete(`/caption/${newCaptionId}`)
        expect(deleteCaption.status).toBe(204);
    });
});

afterAll(async () => {
    await pool.query(
        'DELETE FROM captions WHERE user_id = $1',
        [testUserId]
    );
    await pool.query(
        'DELETE FROM users WHERE id = $1',
        [testUserId]
    );
    await pool.end();
});
