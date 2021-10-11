const crypto = require('crypto');

function tokenGenerator() {
  const result = crypto.randomBytes(8);
  const gottenToken = result.toString('hex');
  
  return gottenToken;
}

module.exports = tokenGenerator;