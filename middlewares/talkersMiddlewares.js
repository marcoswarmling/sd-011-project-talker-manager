const fs = require('fs').promises;

const talkersFile = 'talker.json';

async function blabla(req, res) {
  const { q } = req.query;
  const fileContent = JSON.parse(await fs.readFile(talkersFile, 'utf8'));
  const talkerIndex = fileContent.filter((t) => t.name.includes(q));
  return res.status(200).json(talkerIndex);
}

async function getAllTalkers(_req, res) {
  try {
    const data = await fs.readFile(talkersFile, 'utf-8');
    const parsed = JSON.parse(data);

    if (!parsed || parsed.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(parsed);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function getTalkerById(req, res) {
  const { talkerId } = req.params;
  try {
    const data = await fs.readFile(talkersFile, 'utf-8');
    const parsed = JSON.parse(data);
    const talkerById = parsed.find((talker) => talker.id === parseInt(talkerId, 10));

    if (!talkerById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talkerById);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  blabla,
};