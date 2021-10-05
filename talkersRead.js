const fs = require('fs').promises;

const talkersRead = () => {
  const talkersPromise = new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((fileContent) => {
      if (fileContent) {
        resolve(fileContent);
      } else {
        reject(new Error('Não encontrei o arquivo talker.json'));
      }
    });
  });
  return talkersPromise;
};

module.exports = talkersRead;
