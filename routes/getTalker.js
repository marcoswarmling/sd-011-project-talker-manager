const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  const talker = fs.readFileSync('./talker.json');
  const parseTalk = JSON.parse(talker);
  res.status(200).json(parseTalk);
});

router.get('/:id', (_req, res) => {
  const { id } = _req.params;
  const talker = fs.readFileSync('./talker.json');
  const parseTalk = JSON.parse(talker);
  const person = parseTalk.find((el) => el.id === +id);
  
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(person);
});

module.exports = router;
