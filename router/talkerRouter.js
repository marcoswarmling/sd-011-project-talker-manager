const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const tokenValidation = require('../validation/tokenValidation');
const nameValidation = require('../validation/nameValidation');
const ageValidation = require('../validation/ageValidation');
const talkValidation = require('../validation/talkValidation');
const watchedAtValidation = require('../validation/watchedAtValidation');
const rateValidation = require('../validation/rateValidation');

const db = './talker.json';

const registerValitations = [tokenValidation, nameValidation, 
  ageValidation, talkValidation, watchedAtValidation, rateValidation];

router.get('/', async (_req, res) => {
  const response = await fs.readFile(db, 'utf-8');
  if (response.length === 0) return res.status(200).send([]);
  return res.status(200).json(JSON.parse(response));
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

router.post('/', registerValitations, async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const response = await fs.readFile(db, 'utf-8');
  const registredTalkers = JSON.parse(response);
  const id = registredTalkers.length + 1;
  const person = { id, name, age, talk: { watchedAt, rate } };
  registredTalkers.push(person);
  await fs.writeFile(db, JSON.stringify(registredTalkers));
  return res.status(201).json(person);
});

module.exports = router;