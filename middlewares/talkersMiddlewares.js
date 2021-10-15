const fs = require('fs/promises');

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
    res.status(400).json({ message: 'Erro, né' });
  }
}

module.exports = {
  getAllTalkers,
};
