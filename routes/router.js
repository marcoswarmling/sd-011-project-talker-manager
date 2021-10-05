const router = require('express').Router();

const { readFileContent, getTalkerById } = require('../utils/utils');

router.get('/', async (_req, res) => {
  const fileContent = await readFileContent('./talker.json') || [];
  res.status(200).json(fileContent);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerById);
});

module.exports = router;
