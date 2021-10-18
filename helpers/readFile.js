const fs = require('fs').promises;

async function getTalkers(file) {
  const readTalkers = await fs.readFile(`./${file}`, 'utf-8');
  const talkers = JSON.parse(readTalkers);
  return talkers;
}

async function updateTalkers(file, talker) {
  const data = JSON.stringify(talker, null, 2);
  await fs.writeFile(`./${file}`, data);
}

module.exports = { getTalkers, updateTalkers };
