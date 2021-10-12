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
  const fileContent = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
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
  console.log('check id', req.params.id);
  const fileContent = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
  const temporaryTalkers = fileContent.filter((t) => t.id !== Number(req.params.id));

  const updatedTalker = { name, age, talk, id: Number(id) };
  // fileContent[indexTalker] = updatedTalker;
  const updateList = [...temporaryTalkers, updatedTalker];
  await fs.writeFile('./talker.json', JSON.stringify(updateList));
  return res.status(200).json(updatedTalker);
});

module.exports = userRoute;