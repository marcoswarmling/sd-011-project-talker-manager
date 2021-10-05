const crypto = require('crypto');

const generateToken = (req, res, _next) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};

module.exports = generateToken;
