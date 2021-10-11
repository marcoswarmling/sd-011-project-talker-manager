const router = require('express').Router();
const fs = require('fs').promises;
const rescue = require('express-rescue');

router.get('/', rescue(async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const selectedTalker = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!selectedTalker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).json(selectedTalker);
}));

module.exports = router;