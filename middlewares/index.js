const fs = require('fs/promises');

const talker = 'talker.json';

const allSpeaker = async (_req, res) => {
  const readTalker = JSON.parse(await fs.readFile(talker, 'utf-8'));

  if (readTalker.length < 1) return res.status(200).json([]);

  res.status(200).json(readTalker);
};

const findSpeaker = async (req, res) => {
  const readTalker = JSON.parse(await fs.readFile(talker, 'utf-8'));
  const findedTalker = readTalker.find((t) => t.id === Number(req.params.id));

  if (!findedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findedTalker);
};

module.exports = {
  allSpeaker,
  findSpeaker,
};
