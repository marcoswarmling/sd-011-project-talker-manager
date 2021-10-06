const fs = require('fs').promises;

const express = require('express');

const router = express.Router();

const talkersJSON = './talker.json';

const {
  authValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkPropertiesValidation,
} = require('./talkerValidations');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getTalkers = await fs.readFile(talkersJSON, 'utf-8');
  try {
    const talkersData = JSON.parse(getTalkers);
    const getTalker = talkersData.find((talker) => talker.id === parseInt(id, 10));
    if (getTalker) {
      return res.status(200).send(getTalker);
    }
    throw new Error('erro');
  } catch (_err) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

router.get('/', async (_req, res) => {
  const getTalkers = await fs.readFile(talkersJSON, 'utf-8');
  res.status(200).json(JSON.parse(getTalkers));
});

router.post('/', 
  authValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkPropertiesValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const getTalkers = await fs.readFile(talkersJSON, 'utf-8');
      const talkersData = await JSON.parse(getTalkers);
      const newId = talkersData.length + 1;
      talkersData.push({ id: newId, name, age, talk });
      await fs.writeFile(talkersJSON, JSON.stringify(talkersData));
      res.status(201).json({ id: newId, name, age, talk });
    } catch (error) {
      return error;
    }
});

router.put('/:id', 
  authValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkPropertiesValidation,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    try {
      const getTalkers = await fs.readFile(talkersJSON, 'utf-8');
      const talkersData = await JSON.parse(getTalkers);
      const editTalker = talkersData.filter((talker) => talker.id !== parseInt(id, 10));
      editTalker.push({ id: parseInt(id, 10), name, age, talk });
      await fs.writeFile(talkersJSON, JSON.stringify(editTalker));
      res.status(200).json({ id: parseInt(id, 10), name, age, talk });
    } catch (error) {
      return error;
    }
});

module.exports = router;
