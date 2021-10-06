const fs = require('fs/promises');

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((talkers) => JSON.parse(talkers));
}

module.exports = { getTalkers };
