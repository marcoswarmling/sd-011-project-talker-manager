const fs = require('fs').promises;
const crypto = require('crypto');

const readFile = (content) => 
  fs.readFile(content, 'utf-8')
    .then((res) => JSON.parse(res))
    .catch((err) => JSON.parse(err));

const generateToken = () => crypto.randomBytes(8).toString('hex');

const writeFiles = (fileName, content) => fs.writeFile(fileName, JSON.stringify(content));

module.exports = {
  readFile,
  generateToken,
  writeFiles,
};