const fs = require('fs');
const express = require('express');

const router = express.Router();

// 1
router.get('/talker', (_req, res) => {
  const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

  if (!response) {
    return res.status(200).json([]);
  }

  res.status(200).json(response);
});

// 2
router.get('/talker/:id', (req, res) => {
  const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const { id } = req.params;
  const findTalker = response.find((talker) => talker.id === Number(id));

  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findTalker);
});

module.exports = router;
