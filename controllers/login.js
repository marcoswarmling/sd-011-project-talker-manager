const crypto = require('crypto');
// const models = require('../models');

const login = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
};

module.exports = { login };