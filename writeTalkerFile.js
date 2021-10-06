const fs = require('fs').promises;

async function writeTalkerFile(newTalker) {
  try {
    await fs.writeFile('./talker.json', newTalker);
  } catch (error) {
    console.error(`Erro ao escrever o arquivo: ${error.message}`);
  }
}

module.exports = writeTalkerFile;
