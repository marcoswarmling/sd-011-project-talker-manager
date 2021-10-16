const fs = require('fs').promises;

const file = 'talker.json';

const getAll = async () => {
  const result = await fs.readFile(file, 'utf8');
  return result;
};

const getById = async (id) => {
  const result = JSON.parse(await fs.readFile(file, 'utf8'));
  const talker = result.find((item) => item.id === parseInt(id, 10));

  if (!talker) return null;
  
  return talker;
};

module.exports = { getAll, getById };
