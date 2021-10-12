const router = require('express').Router();
const fs = require('fs');

router.get('/', (_req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
    if (!talkers) return res.status(200).json([]);

    res.status(200).json(talkers);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const searchById = JSON.parse(fs.readFileSync('talker.json', 'utf-8'))
    .find((talker) => talker.id === Number(id));

    if (!searchById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(200).json(searchById);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = { router };
