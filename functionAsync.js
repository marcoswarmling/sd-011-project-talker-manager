const fs = require('fs').promises;

const nomeDoArquivo = './talker.json';

function getReadFile() {
  return fs
    .readFile(nomeDoArquivo, 'utf8')

    .then((data) => JSON.parse(data));
}

function setWriteFile(newPerson) {
  return fs.writeFile(nomeDoArquivo, JSON.stringify(newPerson));
}

module.exports = { getReadFile, setWriteFile };
