const fs = require('fs').promises;

const db = './talker.json';

const readFile = async () => {
  const content = await fs.readFile(db, 'utf8');
  const response = await JSON.parse(content);
  return response;
};

const writeFile = (newContent) => {
  fs.writeFile(db, JSON.stringify(newContent))
  .then(() => {
    console.log('Arquivo salvo');
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = { readFile, writeFile };
