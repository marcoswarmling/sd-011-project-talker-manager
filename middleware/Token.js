const crypto = require('crypto');
const { status } = require('../status/index');

const loginToken = crypto.randomBytes(8).toString('hex');

const getToken = (req, res) => {
  res.status(status.status200).send({
    token: loginToken,
  });
};

module.exports = { getToken };