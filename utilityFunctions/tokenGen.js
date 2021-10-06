const crypto = require('crypto');

function tokenGen() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

module.exports = tokenGen;