const router = require('express').Router();

const { readFile } = require('../helper/readWriteHelper');

const PATHNAME = './talker.json';

router.get('/', async (_req, res) => {
  const result = await readFile(PATHNAME) || [];
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile(PATHNAME);
  const talker = result.find((talker) => talker.id === parseInt(id));

  if(!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

module.exports = router;