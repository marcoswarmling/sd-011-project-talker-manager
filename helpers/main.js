const fs = require('fs').promises;

const reading = async () => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  return talker;
};

module.exports = {
  reading,
};
