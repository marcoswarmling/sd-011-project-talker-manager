const express = require('express');
const getFile = require('../helpers/fs-utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await getFile('./talker.json');

  if (response.length < 1) return res.status(200).json([]);

  res.status(200).json(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getFile('./talker.json');

  const talker = response.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

module.exports = router;
