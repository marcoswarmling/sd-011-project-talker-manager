const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/talker', (_req, res) => {
  const file = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  if (!file) return res.status(200).json([]);

  res.status(200).json(file);
});

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const talker = file.find((person) => person.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  res.status(200).json(talker);
});

module.exports = router;
