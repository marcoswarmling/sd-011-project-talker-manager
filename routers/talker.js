const router = require('express').Router();
const { readContent } = require('../services/fileHandler');

const talkerDB = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContent(talkerDB) || [];
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContent(talkerDB) || [];
  const talker = talkers.find((obj) => obj.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

module.exports = router;