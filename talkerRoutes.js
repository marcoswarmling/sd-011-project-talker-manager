const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json');
  const result = JSON.parse(talkers);
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const talkers = await fs.readFile('./talker.json');
  const { id } = req.params;
  const result = JSON.parse(talkers);

  const talker = result.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

module.exports = router;
