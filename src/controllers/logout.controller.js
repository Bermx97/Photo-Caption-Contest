
exports.logout = async (req, res) => {
     req.session.destroy(err => {
    if (err) {
      const error = new Error('Logout failed');
      error.status = 500;
      return next(error);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  })
};
