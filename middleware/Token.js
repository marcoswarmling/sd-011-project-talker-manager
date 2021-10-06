const crypto = require('crypto');

const loginToken = crypto.randomBytes(8).toString('hex');

const getToken = (req, res) => {
  res.status(200).send({
    token: loginToken,
  });
};

module.exports = { getToken };