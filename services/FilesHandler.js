const { readFile, writeFile } = require('fs').promises;

const ENCODING = 'utf8';

async function fileRead(paths, encoding = ENCODING) {
  try {
    const fileContent = await readFile(paths, encoding);

    const contentFormater = JSON.parse(fileContent);

    return contentFormater;
  } catch ({ message }) {
    console.error(`Erro ao ler o arquivo: ${JSON.stringify(message)}`);
  }
}

async function fileWrite(paths, newContent, encoding = ENCODING) {
  try {
    const stringifyContent = JSON.stringify(newContent);

    await writeFile(paths, stringifyContent, encoding);
  } catch ({ message }) {
    console.error(`Erro ao escrever o arquivo: ${message}`);
  }
}

module.exports = { fileRead, fileWrite };
