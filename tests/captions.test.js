const request = require('supertest');
const app = require('../app');
const TEST_USERNAME = process.env.TEST_USERNAME;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

describe('POST caption/:id', () => {
    it('should return 401 if user is not logged in', async () => {
        const response = await request(app)
        .post('/caption/lolek')
        .send({ newcaption: 'Test caption' });
         expect(response.status).toBe(401);
         expect(response.body.message).toBe('Please log in to do this.');
    });

    it('should return 201 and add the caption if the user is logged in', async () => {
        const agent = request.agent(app);
        await agent
            .post('/login')
            .send({ username: TEST_USERNAME, password: TEST_PASSWORD });
        const response = await agent
            .post('/caption/lolek')
            .send({ newcaption: 'Test caption' });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('caption added');
    });
    
    it('should return 400 if newcaption is empty', async () => {
        const anotherAgent = request.agent(app);
        await anotherAgent
            .post('/login')
            .send({ username: TEST_USERNAME, password: TEST_PASSWORD });
        const response = await anotherAgent
            .post('/caption/lolek')
            .send({ newcaption: '' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Caption must be between 1 and 130 characters long');
    });
});