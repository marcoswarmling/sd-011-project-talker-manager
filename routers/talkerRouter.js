const fs = require('fs').promises;

const router = require('express').Router();

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((talkers) => JSON.parse(talkers));
}

router.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();

  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;

  const talkerId = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkerId);
});

module.exports = router;