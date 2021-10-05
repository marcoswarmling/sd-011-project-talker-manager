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

const getTalkerById = async (req, res) => {
  try {
    const response = await fs.readFile(jsonFile, 'utf-8');
    const responseConvert = JSON.parse(response);
    const talker = responseConvert.find(({ id }) => id === parseInt(req.params.id, 10));
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
  } catch (err) {
    res.status(400).json(err);
  }  
};

module.exports = { getTalkers, getTalkerById };