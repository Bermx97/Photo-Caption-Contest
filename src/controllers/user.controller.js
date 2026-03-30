const loginService = require('../services/login.service');
const likeService = require('../services/like.service');
const captionService = require('../services/caption.service');
const userService = require('../services/user.service');

exports.showUser = async (req, res) => {
    const wantedUser = req.params.id;
    const userName = req.session.userName;
    if (wantedUser !== userName) {
        return res.status(403).send('You are not allowed to view this profile');
    };
    const findUser = await loginService.findUser(userName);
    const user = findUser.rows[0];
    const totalLikesResult = await likeService.countLikesForUser(user.id);
    const totalLikes = (totalLikesResult.rows[0].total_likes);
    const totalCaptionsResult = await captionService.countCaptionsForUser(user.id);
    const totalCaptions = (totalCaptionsResult.rows[0].count);
    const captions = await userService.getUserCaptions(user.id);
    res.render('user', { username: user.username, role: user.role, totalLikes, totalCaptions, captions });
    };