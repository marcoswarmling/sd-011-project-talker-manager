const fs = require('fs').promises;

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

async function setTalkers(newTalker) {
  fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { getTalkers, setTalkers };
