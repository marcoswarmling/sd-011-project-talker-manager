const fs = require('fs').promises;
const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

async function readTalkerFile() {
  const rawData = await fs.readFile('./talker.json');
  const data = await JSON.parse(rawData);
  return data;
}

function validateEmail(email) {
  const validEmail = /^[A-Za-z0-9._]+@([A-Za-z]+\.)[A-Za-z]{2,3}(\.[A-Za-z]{2})?$/;
  return validEmail.test(email);
}

function validatePassword(password) {
  const validPassword = /[\w]{6,}/;
  return validPassword.test(password);
}

module.exports = {
  readTalkerFile,
  token,
  validateEmail,
  validatePassword,
};
