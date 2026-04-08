const request = require('supertest');
const app = require('../app');

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

