const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', async (_req, res) => {
  const data = await fs.readFileSync('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);

  if (!talkers.length) return res.status(200).send([]);

  return res.status(200).send(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFileSync('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).send(talker);
});

module.exports = router;