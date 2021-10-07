const fs = require('fs');
const express = require('express');

const router = express.Router();

// Requisito 1 - GET com todos os talkers
router.get('/talker', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  res.status(200).json(talkers);
});

// Requisito2 - GET com endpoint /talker/:id
router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const chosenTalker = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!chosenTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(chosenTalker);
});

module.exports = router;
