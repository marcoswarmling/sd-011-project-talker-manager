const fs = require('fs').promises;

const dataBase = async () => {
  const readFile = await fs.readFile('./talker.json', 'utf-8')
  .then((file) => JSON.parse(file))
  .catch((e) => console.log(e, 'Error'));

  return readFile;
};

const addTalker = async (newTalker) => {
  const writeFile = await fs.writeFile('./talker.json', JSON.stringify(newTalker)); // convertendo JSON

  return writeFile;
};

module.exports = { dataBase, addTalker };