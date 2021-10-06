const fs = require('fs').promises;

async function readFile() {
  const fileContent = await fs.readFile('./talker.json');
  const talker = await JSON.parse(fileContent);
  return talker;
}

module.exports = readFile;
