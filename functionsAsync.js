const fs = require('fs/promises');

const path = './talker.json';

function getTalkers() {
  return fs.readFile(path, 'utf8')
    .then((fileContent) => JSON.parse(fileContent));
}

function setTalkers(newTalkers) {
  return fs.writeFile(path, JSON.stringify(newTalkers));
}

module.exports = { getTalkers, setTalkers };
