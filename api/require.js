const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send('Authentication required. Please log in.');
  }
};

module.exports = {
  requireUser,
};