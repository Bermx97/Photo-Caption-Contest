const userController = require('../src/controllers/user.controller');
const userService = require('../src/services/user.service');
const loginService = require('../src/services/login.service');
const captionService = require('../src/services/caption.service');
const likeService = require('../src/services/like.service');

jest.mock('../src/services/user.service');
jest.mock('../src/services/user.service');
jest.mock('../src/services/login.service');
jest.mock('../src/services/caption.service');
jest.mock('../src/services/like.service');


describe('showUser', () => {

    it('should throw 404 if user does not exist', async () => {
        const req = { params: { id: 'Test' }, session: {} };
        const res = { render: jest.fn() };

        loginService.findUser.mockResolvedValue({ rows: [] });

        await expect(userController.showUser(req, res))
        .rejects.toMatchObject({ message: 'User not found', status: 404 });
        expect(res.render).not.toHaveBeenCalled();


    })

    it('should render user`s page if user existed', async () => {
        const req = {  params: { id: 'Test' }, session: { userName: 'dwe' } };
        const res = { render: jest.fn() };

        loginService.findUser.mockResolvedValue({ rows: [{ id: 33, username: 'Test', role: 'user' }]  });

        userService.getUserCaptions.mockResolvedValue([
            { id: 3, caption: 'sweet', user_id: 33, image_id: 'pig' },
            { id: 5, caption: 'test', user_id: 33, image_id: 'lolek' }
        ]);

        likeService.countLikesForUser.mockResolvedValue({ rows: [{ total_likes: '12' }] });

        captionService.countCaptionsForUser.mockResolvedValue({ rows: [{ count: '2' }] });

        await userController.showUser(req, res);

        expect(res.render).toHaveBeenCalledWith('user', {
            username: 'Test', role: 'user', totalLikes: '12', totalCaptions: '2', captions: [
                { id: 3, caption: 'sweet', user_id: 33, image_id: 'pig' },
                { id: 5, caption: 'test', user_id: 33, image_id: 'lolek' }], 
            loggedUser: 'dwe' });
            expect(res.render).toHaveBeenCalledTimes(1);
    });
});