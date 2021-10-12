const fs = require('fs').promises;

const getFileData = async () => {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return err.mesage;
  }
};

module.exports = { getFileData };
