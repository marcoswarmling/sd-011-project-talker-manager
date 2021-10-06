/* fs-utils.js */
const fs = require('fs/promises');

function getSpekears() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function setSpeakears(newSimpsons) {
  return fs.writeFile('./talker.json', JSON.stringify(newSimpsons));
}

module.exports = { getSpekears, setSpeakears };