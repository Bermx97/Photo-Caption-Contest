
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    res.status(401).json({ message: "Please log in to do this." });
  }
};

module.exports = isAuthenticated;