const crypto = require('crypto');

const getToken = () => {
  const token = crypto.randomBytes(8).toString('hex');

  return token;
};

module.exports = getToken;
