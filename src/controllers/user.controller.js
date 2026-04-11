const loginService = require('../services/login.service');
const likeService = require('../services/like.service');
const captionService = require('../services/caption.service');
const userService = require('../services/user.service');

exports.showUser = async (req, res) => {
    const wantedUser = req.params.id;
    const findUser = await loginService.findUser(wantedUser);
    const loggedUser = req.session.userName || null;
    if (!findUser.rows[0]) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    };
    const user = findUser.rows[0];
    const totalLikesResult = await likeService.countLikesForUser(user.id);
    const totalLikes = (totalLikesResult.rows[0].total_likes);
    const totalCaptionsResult = await captionService.countCaptionsForUser(user.id);
    const totalCaptions = (totalCaptionsResult.rows[0].count);
    const captions = await userService.getUserCaptions(user.id);
    res.render('user', { username: user.username, role: user.role, totalLikes, totalCaptions, captions, loggedUser: loggedUser });
};

exports.editUsername = async (req, res, next) => {
    try {
        const user = req.session.userName || null;
        const newNickname = req.body.newNickname;
        const result = await userService.editUsername(user, newNickname);
    if (result.rows.length === 0) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    };
    req.session.userName = result.rows[0].username;
    res.status(200).json({ nickname: result.rows[0].username });

    } catch (err) {
        if (err.code === '23505') {
        const err = new Error('Username already taken');
        err.status = 400;
        return next(err);
    }
    next(err);
  }
}