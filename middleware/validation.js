const fs = require('fs').promises;

const getTalker = async (req, res) => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    if (!talker) {
      return res.status(200).json([]);
    }
    res.status(200).json(JSON.parse(talker));
  } catch (error) {
    res.status(404).json(error);
  }
};

const getTalkerId = async (req, res) => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    if (!talker) {
      return res.status(200).json([]);
    }
    const arrTalker = JSON.parse(talker);
    const findTalker = arrTalker.find(({ id }) => id === Number(req.params.id));
    if (!findTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(findTalker);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { getTalker, getTalkerId };
