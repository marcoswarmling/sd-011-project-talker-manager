const fs = require('fs').promises;

const readFile = async (_req, res) => {
  try {
    const response = await fs.readFile('./talker.json', 'utf-8');

    return JSON.parse(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkers = async (_req, res) => {
  try {
    const response = await readFile();
    if (!response) {
      return res.status(200).json([]);
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getTalkers,
};
