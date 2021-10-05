const router = require('express').Router();
const { readContentFile } = require('../helpers/readWriteFile');

router.get('/', async (_req, res) => {
  const talker = await readContentFile('./talker.json') || [];
  res.status(200).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readContentFile('./talker.json') || [];
  const checkId = talker.find((item) => item.id === Number(id));
  if (!checkId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(checkId);
});

module.exports = router;
