const fs = require('fs/promises');

const readFile = async (path) => {
  try {
    const file = await fs.readFile(path, 'utf-8');
    const fileParsed = await JSON.parse(file);

    return fileParsed;
  } catch (err) {
    return { code: err.code, message: err.message };
  }
};

module.exports = readFile;
