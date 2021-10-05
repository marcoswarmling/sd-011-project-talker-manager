const fs = require('fs').promises;

const readFile = async () => {
  try {
    const file = await fs.readFile('./talker.json', 'utf-8');
    const fileParsed = await JSON.parse(file);

    return fileParsed;
  } catch (err) {
    return { code: err.code, message: err.message };
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(data));
  } catch (err) {
    return { code: err.code, message: err.message };
  }
};

module.exports = { readFile, writeFile };
