const fs = require('fs').promises;

const talkerDelete = (id) => {
  const talkersPromise = new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((fileContent) => {
      const talkers = fileContent;
      const talkerFiltered = talkers.filter((talker) => talker.id !== parseInt(id, 10));
      if (talkerFiltered) {
        resolve(fs.writeFile('./talker.json', JSON.stringify(talkerFiltered)));
      } else {
        reject(new Error('Palestrante não encontrado'));
      }
    });
  });
  return talkersPromise;
};

module.exports = talkerDelete;