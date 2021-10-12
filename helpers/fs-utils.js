const fs = require('fs/promises');

const getFile = async (file) => {
  const data = await fs.readFile(file, 'utf-8');
  const dataJSON = await JSON.parse(data);

  return dataJSON;
};

const writeFile = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data));
};

module.exports = { getFile, writeFile };
