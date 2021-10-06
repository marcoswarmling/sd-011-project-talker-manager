const router = require('express').Router();
const fs = require('fs').promises;

const validToken = require('../middlewares/validToken');
const validName = require('../middlewares/validName');
const validAge = require('../middlewares/validAge');
const validNewTalker = require('../middlewares/validNewTalker');
const validWatchedAt = require('../middlewares/validWatchedAt');
const validRate = require('../middlewares/validRate');

const validatedTalker = [validToken, validName, 
  validAge, validNewTalker, validWatchedAt, validRate];

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  
  res.status(200).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const search = JSON.parse(talkers).find((item) => item.id === Number(id));
  if (!search) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(search);
});

router.post('/', validatedTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  const id = parsedTalkers.length + 1;

  const newTalker = { id, name, age, talk: { rate, watchedAt } };
  parsedTalkers.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(parsedTalkers));
  return res.status(201).json(newTalker);
});

module.exports = router;
