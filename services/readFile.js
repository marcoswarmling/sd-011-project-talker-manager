const fs = require('fs');

const readFile = async (filePath) => {
  try {
    const data = await fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
  console.error(`Não encontramos o arquivo: ${filePath}, Error: ${error}`);  
  }
};

module.exports = readFile;
