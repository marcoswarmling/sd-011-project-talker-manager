const fs = require('fs/promises');

const talker = 'talker.json';

const allSpeaker = async (_req, res) => {
  const readTalker = JSON.parse(await fs.readFile(talker, 'utf-8'));

  if (readTalker.length < 1) return res.status(200).json([]);

  res.status(200).json(readTalker);
};

module.exports = {
  allSpeaker,
};
