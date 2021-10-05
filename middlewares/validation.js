const fs = require('fs').promises;

const messages = 'Pessoa palestrante não encontrada';
const HTTP_OK_STATUS = 200;

const getAllTalkers = async (req, res) => {
  try {
    const response = await fs.readFile('./talker.json', 'utf8');
    if (!response) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const talker = await fs.readFile('./talker.json', 'utf8');
    const result = JSON.parse(talker);
    const response = result.find((value) => value.id === Number(id));

    if (!response) return res.status(404).json({ message: messages });

    res.status(HTTP_OK_STATUS).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getAllTalkers, getTalkerById };