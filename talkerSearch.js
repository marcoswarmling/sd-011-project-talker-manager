const fs = require('fs').promises;

const talkerSearch = (name) => {
  const talkersPromise = new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((fileContent) => {
      const talkers = fileContent;
      const talkerFiltered = talkers.filter((talker) => talker.name.includes(name));
      if (talkerFiltered) resolve(talkerFiltered);
      reject(new Error('Palestrante não encontrado'));
    });
  });
  return talkersPromise;
};

module.exports = talkerSearch;