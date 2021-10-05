const talkerValidator = (req, res, next) => {
  const { username } = req.body;
  if (!username || username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3' });
  }
  next();
};

module.exports = { talkerValidator };
