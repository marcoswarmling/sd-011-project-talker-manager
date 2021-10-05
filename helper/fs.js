const fs = require('fs').promises;

async function readTalkerFile() {
  const rawData = await fs.readFile('./talker.json');
  const data = await JSON.parse(rawData);
  return data;
}

module.exports = readTalkerFile;