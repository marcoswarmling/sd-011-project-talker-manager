const fs = require('fs').promises;

const db = './talker.json';

const readFile = async () => {
  const content = await fs.readFile(db, 'utf8');
  const response = await JSON.parse(content);
  return response;
};

module.exports = { readFile };
