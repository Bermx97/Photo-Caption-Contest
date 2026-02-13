
exports.showHome = (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect('/gallery');
  }

  res.render('loginPage');
};
