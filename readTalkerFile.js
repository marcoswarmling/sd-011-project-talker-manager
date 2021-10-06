const fs = require('fs').promises;

async function readTalkerFile() {
  const fileContent = await fs.readFile('./talker.json', 'utf-8');
  const talker = await JSON.parse(fileContent);
  return talker;
}

module.exports = readTalkerFile;
