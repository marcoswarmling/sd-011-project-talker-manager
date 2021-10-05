const fs = require('fs/promises');

const readFile = async (file) => { 
  const read = await fs.readFile(file, 'utf8');
  return JSON.parse(read);
};

const writeFile = async (file, change) => {
  await fs.writeFile(file, JSON.stringify(change));
};

module.exports = { readFile, writeFile };