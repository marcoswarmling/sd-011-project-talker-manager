const router = require('express').Router();
const fs = require('fs').promises;

const validToken = require('../middlewares/validToken');
const validName = require('../middlewares/validName');
const validAge = require('../middlewares/validAge');
const validNewTalker = require('../middlewares/validNewTalker');
const validWatchedAt = require('../middlewares/validWatchedAt');
const validRate = require('../middlewares/validRate');

const db = './talker.json';

const validatedTalker = [validToken, validName, 
  validAge, validNewTalker, validRate, validWatchedAt];

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(db, 'utf-8');
  
  res.status(200).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(db, 'utf-8');
  const search = JSON.parse(talkers).find((item) => item.id === Number(id));
  if (!search) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(search);
});

router.post('/', validatedTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;
  const talkers = await fs.readFile(db, 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  const id = parsedTalkers.length + 1;

  const newTalker = { id, name, age, talk: { rate, watchedAt } };
  parsedTalkers.push(newTalker);

  await fs.writeFile(db, JSON.stringify(parsedTalkers));
  return res.status(201).json(newTalker);
});

router.put('/:id', validatedTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = { id: Number(id), name, age, talk };
  const talkers = await fs.readFile(db, 'utf-8');
  const parsedTalkers = JSON.parse(talkers);

  const indexOfTalker = parsedTalkers.findIndex((elem) => elem.id === Number(id));
  parsedTalkers[indexOfTalker] = editedTalker;
  await fs.writeFile(db, JSON.stringify(parsedTalkers));

  return res.status(200).json(editedTalker);
});

router.delete('/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(db, 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  const selectedTalker = parsedTalkers.filter((elem) => elem.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(selectedTalker));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
