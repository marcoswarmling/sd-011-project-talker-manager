const fs = require('fs').promises;

const jsonFile = './talker.json';

const getTalkers = async (req, res) => {
  try {
    const response = await fs.readFile(jsonFile, 'utf-8');
    if (!response) {
      return res.status(200).json([]);
    }
    res.status(200).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getTalkers };