const fs = require('fs/promises');

const readFile = async (file) => { 
  const read = await fs.readFile(file, 'utf8');
  return read;
};

module.exports = { readFile };