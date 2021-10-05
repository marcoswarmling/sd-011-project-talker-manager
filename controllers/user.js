const crypto = require('crypto');

const { validate } = require('../validators');
const loginSchema = require('../validators/schemas/login.json');

const login = ({ email, password }) => new Promise((resolve, reject) => {
  try {
    validate(loginSchema, { email, password });

    const token = crypto.randomBytes(8).toString('hex');

    resolve({ token });
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  login,
};
