const fs = require('fs').promises;

const readFile = async (filePath) => {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${filePath}\n Erro: ${err}`);
  }
};

module.exports = readFile;