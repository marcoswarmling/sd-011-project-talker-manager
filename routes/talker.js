const router = require('express').Router();
const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(talkers));
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const search = JSON.parse(talkers).find((item) => item.id === Number(id));
  if (!search) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(search);
});

module.exports = router;
