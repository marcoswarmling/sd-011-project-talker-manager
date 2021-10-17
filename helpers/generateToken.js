const crypto = require('crypto');

function Generator() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = Generator;