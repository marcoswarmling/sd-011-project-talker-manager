const fs = require('fs').promises;

const readFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeFile = async (path, content) => {
  try {
    const file = await readFile(path);
    file.push(content);
    await fs.writeFile(path, JSON.stringify(file));
    return file;
  } catch (error) {
    return null;
  }
};

module.exports = {
  readFile,
  writeFile,
};