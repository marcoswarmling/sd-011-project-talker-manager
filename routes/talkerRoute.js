const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const fileContent = fs.readFileSync('./talker.json', 'utf8');
    const talkers = JSON.parse(fileContent);
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const fileContent = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const data = fileContent.find((t) => t.id === Number(id));
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
