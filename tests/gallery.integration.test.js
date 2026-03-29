const request = require('supertest');
const app = require('../app');
const galleryService = require('../src/services/gallery.service');
const session = require('express-session');
galleryController = require('../src/controllers/gallery.controller');
jest.mock('../src/services/gallery.service');

describe('GET /', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 500 if images do not exist', async () => {
        galleryService.getGallery.mockResolvedValue( [] );
        const response = await request(app)
        .get('/gallery')
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Server error');
    });

    it('should return 200 and render gallery if image exist', async () => {
        const req = { query: { page: 3 }}
        const res = { render: jest.fn() };

        galleryService.getGallery.mockResolvedValue([{ id:'lolek', filename:'lolek.jpg' }, { id:'koko', filename:'koko.jpg' }]);

        await galleryController.showGallery(req, res);

        const response = await request(app)
        .get('/gallery')
        expect(response.status).toBe(200);
        expect(res.render).toHaveBeenCalledWith('gallery', {
            images: [
                { id: 'lolek', filename: 'lolek.jpg' },
                { id: 'koko', filename: 'koko.jpg' }
            ]});
        expect(res.render).toHaveBeenCalledTimes(1);
    });
});

describe('GET /gallery/:id', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 404 if image do not exist', async () => {
        galleryService.getImageWithCaptions.mockResolvedValue( [] );
        const response = await request(app)
        .get('/gallery/test')
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Image not found');
    });

    it('should return 200 and render image with captions if image exist', async () => {
        const req = { params: { id: 'lolek' }, session: { userId : 2, role: 'user' }, query: { page: 3 } }
        const res = { render: jest.fn() };

        galleryService.getImageWithCaptions.mockResolvedValue({
             image: { id: 'lolek', filename: 'lolek.jpg' },
             captions: [
                { id: 6, caption: 'testCaption', user_id: 4, image_id: 'lolek' },
                { id: 1, caption: 'lolinek', user_id: 1, image_id: 'lolek' },
             ],
             totalResult: 50
            });
        await galleryController.showImage(req, res);
        const response = await request(app)
        .get('/gallery/lolek')
        expect(response.status).toBe(200);
        expect(res.render).toHaveBeenCalledWith('image', {
            image: { id: 'lolek', filename: 'lolek.jpg' },
            captions: [
                { id: 6, caption: 'testCaption', user_id: 4, image_id: 'lolek' },
                { id: 1, caption: 'lolinek', user_id: 1, image_id: 'lolek' }
             ],
             currentUserId: req.session.userId,
             currentUserRole: req.session.role,
             page: 3,
             totalPage: 10
        });
        expect(res.render).toHaveBeenCalledTimes(1);
    });
});