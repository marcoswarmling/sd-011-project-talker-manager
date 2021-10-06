const fs = require('fs').promises;

const talkersWrite = (newTalker) => {
  const talkersPromise = new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((fileContent) => {
      const talkers = fileContent;
      talkers.push(newTalker);
      if (newTalker) {
        resolve(fs.writeFile('./talker.json', JSON.stringify(talkers)));
      } else {
        reject(new Error('Não consegui escrever no arquivo talker.json'));
      }
    });
  });
  return talkersPromise;
};

module.exports = talkersWrite;