const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const tokenValidation = require('../validation/tokenValidation');
const nameValidation = require('../validation/nameValidation');
const ageValidation = require('../validation/ageValidation');
const talkValidation = require('../validation/talkValidation');
const watchedAtValidation = require('../validation/watchedAtValidation');
const rateValidation = require('../validation/rateValidation');

const deleteValidations = [tokenValidation];

const db = './talker.json';

const registerOrEditValidations = [tokenValidation, nameValidation, 
  ageValidation, talkValidation, watchedAtValidation, rateValidation];

router.get('/', async (_req, res) => {
  const response = await fs.readFile(db, 'utf-8');
  if (response.length === 0) return res.status(200).send([]);
  return res.status(200).json(JSON.parse(response));
});

router.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const response = await fs.readFile(db, 'utf-8');
  const registeredTalkers = JSON.parse(response);
  if (!q || q === '') return res.status(200).json(registeredTalkers);
  const filteredTalkers = registeredTalkers
  .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
  res.status(200).json(filteredTalkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(db, 'utf-8');
  const result = JSON.parse(response).find((talker) => Number(talker.id) === Number(id));
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(result);
});

router.post('/', registerOrEditValidations, async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const response = await fs.readFile(db, 'utf-8');
  const registeredTalkers = JSON.parse(response);
  const id = registeredTalkers.length + 1;
  const person = { id, name, age, talk: { watchedAt, rate } };
  registeredTalkers.push(person);
  await fs.writeFile(db, JSON.stringify(registeredTalkers));
  return res.status(201).json(person);
});

router.put('/:id', registerOrEditValidations, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const person = { id: Number(id), name, age, talk: { watchedAt, rate } };
  const response = await fs.readFile(db, 'utf-8');
  const registeredTalkers = JSON.parse(response);
  const indexOfTalkerToEdit = registeredTalkers
  .findIndex((talker) => Number(talker.id) === Number(id));
  registeredTalkers[indexOfTalkerToEdit] = person;
  await fs.writeFile(db, JSON.stringify(registeredTalkers));
  return res.status(200).json(person);
});

router.delete('/:id', deleteValidations, async (req, res) => {
  const { id } = req.params;  
  const response = await fs.readFile(db, 'utf-8');
  const registeredTalkers = JSON.parse(response);
  const newregisteredTalkers = registeredTalkers
  .filter((talkers) => Number(talkers.id) !== Number(id));
  await fs.writeFile(db, JSON.stringify(newregisteredTalkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;