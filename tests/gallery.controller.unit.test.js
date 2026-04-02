const galleryController = require('../src/controllers/gallery.controller');
const galleryService = require('../src/services/gallery.service');
jest.mock('../src/services/gallery.service');

describe('showGallery', () => {

    it('should render gallery if images exist', async () => {
        const req = {};
        const res = { render: jest.fn() };

        galleryService.getGallery.mockResolvedValue([{ id:'lolek', filename:'lolek.jpg' }, { id:'koko', filename:'koko.jpg' }]);

        await galleryController.showGallery(req, res);

        expect(res.render).toHaveBeenCalledWith('gallery', {
            images: [
                { id: 'lolek', filename: 'lolek.jpg' },
                { id: 'koko', filename: 'koko.jpg' }
            ], 
            userName: null, });
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(galleryService.getGallery).toHaveBeenCalled();
    });

    it('should throw 500 error if images do not exist', async () => {
    const req = { params: { id: 'test' } };
    const res = { render: jest.fn() };

    galleryService.getGallery.mockResolvedValue([]);

    await expect(galleryController.showGallery(req, res))
        .rejects.toMatchObject({ message: 'Server error', status: 500 });

    expect(res.render).not.toHaveBeenCalled();
    });
});

describe('showImage', () => {

    it('should throw 404 if image does not exist', async () => {
        const req = { params: { id: 'test' }, query: { page: [] } };
        const res = { render: jest.fn() };

        galleryService.getImageWithCaptions.mockResolvedValue({});

        await expect(galleryController.showImage(req, res))
        .rejects.toMatchObject({ message: 'Image not found', status: 404 });

        expect(res.render).not.toHaveBeenCalled();
    });

    it('should render image page if image exists', async () => {
        const req = { params: { id: 'lolek' }, session: { userId : 2, role: 'user', userName: 'testuser' }, query: { page: 3 } }
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
        
        expect(res.render).toHaveBeenCalledWith('image', {
            image: { id: 'lolek', filename: 'lolek.jpg' },
            captions: [
                { id: 6, caption: 'testCaption', user_id: 4, image_id: 'lolek' },
                { id: 1, caption: 'lolinek', user_id: 1, image_id: 'lolek' }
             ],
             userName: 'testuser',
             currentUserId: req.session.userId,
             currentUserRole: req.session.role,
             page: 3,
             totalPage: expect.any(Number)
        });
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(galleryService.getImageWithCaptions).toHaveBeenCalledWith('lolek', 5, 10);
    });
});
