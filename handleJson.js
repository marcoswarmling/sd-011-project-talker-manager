const fs = require('fs/promises');

const readFile = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(file);
};

const writeFile = async (content) => {
  const file = await readFile();
  const newArray = [...file, content];
  await fs.writeFile('./talker.json', JSON.stringify(newArray));
};

module.exports = {
  readFile,
  writeFile,
};