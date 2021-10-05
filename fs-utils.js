const fs = require('fs/promises');

function getTalker() {
  const talker = fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent))
    .catch((_err) => []); 

  return talker;
}

function setTalker(newTalkers) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalkers));
}

module.exports = { getTalker, setTalker };