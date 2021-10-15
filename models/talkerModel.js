const fs = require('fs').promises;

const file = 'talker.json';

const getAll = async () => {
  const result = await fs.readFile(file, 'utf8');
  return result;
};

module.exports = { getAll };
