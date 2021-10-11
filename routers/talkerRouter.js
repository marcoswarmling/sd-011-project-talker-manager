const router = require('express').Router();
const fs = require('fs').promises;
const rescue = require('express-rescue');

const authMiddleware = require('../middlewares/authMiddleware');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalkObj = require('../middlewares/validateTalkObj');
const validateTalkParams = require('../middlewares/validateTalkParams');

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

router.post('/',
  authMiddleware,
  validateName,
  validateAge,
  validateTalkObj,
  validateTalkParams,
  rescue(async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const lastTalker = talkers[talkers.length - 1];
  const newTalker = { name, age, talk, id: Number(lastTalker.id) + 1 };
  
  talkers.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  
  res.status(201).json(newTalker);
}));

module.exports = router;