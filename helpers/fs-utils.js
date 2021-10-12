const fs = require('fs');

const getFile = async (file) => {
  const data = await fs.promises.readFile(file, 'utf-8');
  const dataJSON = await JSON.parse(data);

  return dataJSON;
};

const writeFile = async (file, data) => {
  await fs.promises.writeFile(file, JSON.stringify(data));
};

module.exports = { getFile, writeFile };
