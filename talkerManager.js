const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const talkerUtils = require('./fs-utils');
const { generationToken } = require('./validateLogin');
const { validateEmail,
validatePassword } = require('./validateLogin');
const { validateToken, checkName,
checkAge, checkDateFormat, checkRates, checkTalk } = require('./validateData');

router.get('/talker', rescue(async (_req, res) => {
  const talkers = await talkerUtils.getTalker();
  if (!talkers) {
    return res.status(200).json(talkers);
  } 
  return res.status(200).json(talkers);
}));

router.get('/talker/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await talkerUtils.getTalker();
  const talker = talkers.find((personTalker) => personTalker.id === Number(id));
  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).json(talker);
}));

router.post('/login', validateEmail, validatePassword, (req, res, next) => {
  const token = generationToken(16);
  res.status(200).json({ token: `${token}` });
  next();
});

router.post('/talker', validateToken, checkName, checkAge, 
checkTalk, checkDateFormat, checkRates, rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerReadFile = await talkerUtils.getTalker();
  const talker = { name, age, id: talkerReadFile.length + 1, talk };

  const newArray = [...[...talkerReadFile], talker];
  
  talkerReadFile.push(talker);
  await talkerUtils.setTalker(newArray);
  
  return res.status(201).json(talker);
}));

router.put('/talker/:id', validateToken, checkName, checkAge, 
checkTalk, checkDateFormat, checkRates, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = await talkerUtils.getTalker();

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  
  const newArray = [...[...talkers], talkers[talkerIndex]];

  await talkerUtils.setTalker(newArray);

  return res.status(200).json(talkers[talkerIndex]);
}));

router.delete('/talker/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await talkerUtils.getTalker();

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (!talkerIndex) return res.status(200).json({ message: 'Pessoa palestrante não encontrada' });

  talkers.slice(talkerIndex, 1);
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  
  await talkerUtils.setTalker(newTalkers);

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

router.get('/talker/search', validateToken, rescue(async (req, res) => {
  const { searchTerm } = req.query;
  const talkers = await talkerUtils.getTalker();
  const searchTalker = talkers.filter((talker) => talker.name.includes(searchTerm));

  if (!searchTerm) {
    return res.status(200).json(talkers);
  }
  if (!searchTalker) {
    return res.status(200).json([]);
  }
  return res.status(200).json(searchTalker);
}));

module.exports = router;
