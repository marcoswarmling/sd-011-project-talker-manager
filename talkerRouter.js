const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(talkers));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const talker = talkers.find((person) => Number(person.id) === Number(id));
    return talker 
      ? res.status(200).json(talker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;