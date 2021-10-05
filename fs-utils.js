const fs = require('fs/promises');
const crypto = require('crypto');

async function getTalkers() {
  const fileContent = await fs.readFile('talker.json', 'utf-8');
  return JSON.parse(fileContent);
}

function setTalkers(newTalkers) {
  return fs.writeFile('talker.json', JSON.stringify(newTalkers));
}

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = { getTalkers, setTalkers, generateToken };
