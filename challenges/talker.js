const fs = require('fs');

function talkersList() {
  return JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
}

function writeNewTalker(newTalker) {
  return fs.writeFileSync('./talker.json', newTalker);
}

module.exports = { talkersList, writeNewTalker };
