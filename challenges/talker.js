const fs = require('fs');

function talkersList() {
  return JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
}

module.exports = { talkersList };
