const fs = require('fs').promises;

const talker = './talker.json';

function readTalker() {
  return fs.readFile(talker, 'utf8').then(
    (data) => JSON.parse(data),
  );
}

function writeTalker(data) {
  fs.writeFile(talker, data, 'utf-8', (error) => {
    if (error) throw error;
  });
}

module.exports = { readTalker, writeTalker };
