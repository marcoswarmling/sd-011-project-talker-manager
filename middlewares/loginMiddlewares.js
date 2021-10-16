const Crypto = require('crypto');

// This line generates a random 16 characteres length string
const token = Crypto.randomBytes(8).toString('hex');

function login(_req, res) {
  return res.status(200).json({ token });
}

module.exports = {
  login,
};
