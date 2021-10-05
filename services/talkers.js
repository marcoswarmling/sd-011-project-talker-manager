const path = require('path');
const fs = require('fs').promises;

const DATA_PATH = path.join(__dirname, '../', 'talker.json');

const getAllTalkers = async () => {
    const result = await fs.readFile(DATA_PATH, 'utf8');
    return result;
  };

module.exports = {
  getAllTalkers,
};