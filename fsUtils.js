const fs = require('fs/promises');

function getTalkers() {
  // lendo arquivo:
  return fs.readFile('./talker.json', 'utf-8')
  // 'traduzindo' para json
  .then((fileContent) => JSON.parse(fileContent));
}
module.exports = { getTalkers };