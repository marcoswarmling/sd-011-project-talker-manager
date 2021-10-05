const fs = require('fs').promises;

async function readTalkerFile() {
  const rawData = await fs.readFile('./talker.json');
  const data = await JSON.parse(rawData);
  return data;
}

async function getTalker(id) {
  return readTalkerFile()
    .then((data) => data.find((t) => Number(t.id) === Number(id)))
    .catch((err) => err.message);
}

function validateEmail(email) {
  const validEmail = /^[A-Za-z0-9._]+@([A-Za-z]+\.)[A-Za-z]{2,3}(\.[A-Za-z]{2})?$/;
  return validEmail.test(email);
}

function validatePassword(password) {
  const validPassword = /^[\w]{6,}$/;
  return validPassword.test(password);
}

function validateName(name) {
  return name.length >= 3;
}

function validateWatchedAt(watchedAt) {
  const validWatchedAt = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/;
  return validWatchedAt.test(watchedAt);
}

function validateRate(rate) {
  const validRate = /^[1-5]$/;
  return validRate.test(rate);
}

module.exports = {
  readTalkerFile,
  getTalker,
  validateEmail,
  validatePassword,
  validateName,
  validateWatchedAt,
  validateRate,
};
