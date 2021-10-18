const fs = require('fs').promises;

const writeFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
  } catch (err) {
    console.error(`Erro ao escrever o arquivo ${filePath}\n Erro: ${err}`);
  }
};

module.exports = writeFile;