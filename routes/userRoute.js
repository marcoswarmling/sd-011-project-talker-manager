// Requisito 4
const express = require('express');
const fs = require('fs').promises;
const {
  checkToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateDateFormat,
  validateRateDate,
} = require('../middleware/userValidation');

const userRoute = express.Router();
const TALKER_FILE_PATH = './talker.json';

userRoute.post('/',
checkToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateDateFormat,
validateRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  // const addId = fileContent[fileContent.length - 1].id + 1;
  const addId = fileContent.length + 1;
  const newTalker = { id: addId, name, age, talk };
  
  fileContent.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(fileContent));
  return res.status(201).json(newTalker);
});

userRoute.put('/:id',
checkToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateDateFormat,
validateRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  const temporaryTalkers = fileContent.filter((t) => t.id !== Number(req.params.id));

  const updatedTalker = { name, age, talk, id: Number(id) };
  const updateList = [...temporaryTalkers, updatedTalker];
  await fs.writeFile('./talker.json', JSON.stringify(updateList));
  return res.status(200).json(updatedTalker);
});

userRoute.delete('/:id', checkToken,
async (req, res) => {
  const { id } = req.params;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  const talkerIndex = fileContent.filter((t) => t.id !== Number(id));
  fileContent.push(talkerIndex);
  await fs.writeFile(TALKER_FILE_PATH, JSON.stringify(talkerIndex));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// userRoute.get('/search', )

module.exports = userRoute;