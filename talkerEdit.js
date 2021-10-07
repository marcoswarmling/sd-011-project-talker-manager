const fs = require('fs').promises;

const talkerEdit = (id, name, age, talk) => {
  const talkersPromise = new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((fileContent) => {
      const talkers = fileContent;
      const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
      if (talkerIndex !== -1) {
        talkers[talkerIndex] = ({ ...talkers[talkerIndex], name, age, talk });
        fs.writeFile('./talker.json', JSON.stringify(talkers));
        resolve(talkers[talkerIndex]);
      } else {
        reject(new Error('Palestrante não encontrado'));
      }
    });
  });
  return talkersPromise;
};

module.exports = talkerEdit;
