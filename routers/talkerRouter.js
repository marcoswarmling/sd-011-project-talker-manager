const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  return res.status(200).json(talker);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  const response = talker.find((r) => r.id === Number(id));

  if (!response) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(response);
});

module.exports = router;
