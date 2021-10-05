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

const getTalkerId = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await readFile();
    const talker = response.find((result) => result.id === Number(id));
    
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
  } catch (err) {
    res.status(400).json(err);
  } 
};

module.exports = {
  getTalkers,
  getTalkerId,
};
