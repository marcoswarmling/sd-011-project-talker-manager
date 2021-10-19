const fs = require('fs').promises;

const writeFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
  } catch (error) {
    console.error(`Não encontramos o arquivo: ${filePath}, Error: ${error}`);  
  }
};

module.exports = writeFile;
