const router = require('express').Router();

const fs = require('fs').promises;

const validateToken = require('../validate/validationsToken');
const validateName = require('../validate/validateName');
const validateAge = require('../validate/validateAge');
const validateTalk = require('../validate/validateTalk');
const validateWatchedAt = require('../validate/validateWatchedAt');
const validateRate = require('../validate/validateRate');

const db = './talker.json';

const validations = [validateToken, validateName,
  validateAge, validateTalk, validateRate, validateWatchedAt];

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(db, 'utf-8');
  res.status(200).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(db, 'utf-8');
  const speakerFiltered = JSON.parse(talkers).find((speaker) => speaker.id === Number(id));
  if (!speakerFiltered) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(speakerFiltered);
});

router.post('/', validations, async (req, res) => {
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;
  const talkers = await fs.readFile(db, 'utf-8');
  const resultTalkers = JSON.parse(talkers);
  const id = resultTalkers.length + 1;

  const person = { id, name, age, talk: { rate, watchedAt } };
  resultTalkers.push(person);
  
  await fs.writeFile(db, JSON.stringify(resultTalkers));
  return res.status(201).json(person);
});

router.put('/:id', validations, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedPerson = { id: Number(id), name, age, talk };
  const talkers = await fs.readFile(db, 'utf-8');
  const resultTalkers = JSON.parse(talkers);

  const talkerIndex = resultTalkers.findIndex((e) => e.id === Number(id));
  resultTalkers[talkerIndex] = editedPerson;
  await fs.writeFile(db, JSON.stringify(resultTalkers));

  return res.status(200).json(editedPerson);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(db, 'utf-8');
  const resultTalkers = JSON.parse(talkers);

  const talkerFilter = resultTalkers.filter((e) => Number(e.id) !== Number(id));
  await fs.writeFile(db, JSON.stringify(talkerFilter));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
