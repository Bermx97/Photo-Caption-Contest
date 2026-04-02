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
       /* const req = {  params: { id: 'Test' }, session: { userName: 'dwe' } };
        const res = { render: jest.fn() };

        loginService.findUser.mockResolvedValue({ rows: [{ id: 33, username: 'Test', role: 'user' }]  });

        userService.getUserCaptions.mockResolvedValue([
            { id: 3, caption: 'sweet', user_id: 33, image_id: 'pig' },
            { id: 5, caption: 'test', user_id: 33, image_id: 'lolek' }
        ]);

        likeService.countLikesForUser.mockResolvedValue({ rows: [{ total_likes: '12' }] });

        captionService.countCaptionsForUser.mockResolvedValue({ rows: [{ count: '2' }] });

        await userController.showUser(req, res);
*/
        const response = await request(app)
        .get('/user/Lukasz')
        expect(response.status).toBe(200);
        /*
        expect(res.render).toHaveBeenCalledWith('user', {
            username: 'Test', role: 'user', totalLikes: '12', totalCaptions: '2', captions: [
                { id: 3, caption: 'sweet', user_id: 33, image_id: 'pig' },
                { id: 5, caption: 'test', user_id: 33, image_id: 'lolek' }], 
            loggedUser: 'dwe'
        });
        expect(res.render).toHaveBeenCalledTimes(1);*/
    });
});

