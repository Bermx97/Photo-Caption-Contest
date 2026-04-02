const request = require('supertest');
const app = require('../app');
const galleryService = require('../src/services/gallery.service');
const session = require('express-session');

describe('GET /', () => {

    it('should return 200 if image exist', async () => {
        const response = await request(app)
        .get('/gallery')
        expect(response.status).toBe(200);
    });
});

describe('GET /gallery/:id', () => {

    it('should return 404 if image do not exist', async () => {
        const response = await request(app)
        .get('/gallery/test')
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Image not found');
    });

    it('should return 200 if image exist', async () => {
        const response = await request(app)
        .get('/gallery/lolek')
        expect(response.status).toBe(200);
    });
});