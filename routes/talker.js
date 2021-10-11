const router = require('express').Router();
const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talkerId = JSON.parse(talkers).find((item) => item.id === req.params.id);
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  return res.status(404).json({ error: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
