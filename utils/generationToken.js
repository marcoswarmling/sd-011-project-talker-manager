const crypto = require('crypto');

module.exports = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};
