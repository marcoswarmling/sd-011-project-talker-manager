const router = require('express').Router();
const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(talkers).find((talker) => talker.id === req.params.id);
  if (talker) {
    return res.status(200).json(talker);
  } else {
   return res.status(404).json({ error: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;
