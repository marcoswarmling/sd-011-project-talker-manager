const express = require('express');

const router = express.Router();
const fs = require('fs');

router.get('/', (_req, res) => {
  try {
    const talker = fs.readFileSync('./talker.json');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const talkers = fs.readFileSync('./talker.json');
    const talker = JSON.parse(talkers).find((t) => Number(t.id) === Number(id));
    return talker 
    ? res.status(200).json(talker) 
    : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
