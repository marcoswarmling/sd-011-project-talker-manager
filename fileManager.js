const fs = require('fs').promises;

const getTalkersData = async () => {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
};

module.exports = { getTalkersData };
