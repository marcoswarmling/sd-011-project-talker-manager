const express = require('express');
const talkersRead = require('./talkersRead');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkersPersons = await talkersRead();
  if (talkersPersons) return res.status(200).json(talkersPersons);
  res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const talkersPersons = await talkersRead();
  const { id } = req.params;
  const talker = talkersPersons.find((person) => parseInt(person.id, 10) === parseInt(id, 10));
  if (talker) return res.status(200).json(talker);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
