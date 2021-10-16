const fs = require('fs').promises;

const talkersFile = 'talker.json';

async function getAllTalkers(_req, res) {
  try {
    const data = await fs.readFile(talkersFile, 'utf-8');
    const parsed = JSON.parse(data);

    if (!parsed || parsed.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(400).json({ message: error });
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
    return res.status(400).json({ message: error });
  }
}

async function postTalker(req, res) {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  try {
    const data = await fs.readFile(talkersFile, 'utf-8');
    const parsed = JSON.parse(data);
    const newTalkerId = parsed.length + 1;
    const talkerToAdd = { name, age, id: newTalkerId, talk: { watchedAt, rate } };
    parsed.push(talkerToAdd);
    await fs.writeFile(talkersFile, JSON.stringify(parsed));
    return res.status(201).json(talkerToAdd);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  postTalker,
};
