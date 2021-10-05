const fs = require('fs').promises;

async function getTalkers(file) {
  const readTalkers = await fs.readFile(`./${file}`, 'utf-8');
  const talkers = JSON.parse(readTalkers);
  return talkers;
}

module.exports = { getTalkers };
