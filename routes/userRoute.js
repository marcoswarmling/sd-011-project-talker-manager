// Requisito 4
const express = require('express');
const fs = require('fs');
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
(req, res) => {
  const { name, age, talk } = req.body;
  const fileContent = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const addId = fileContent[fileContent.length - 1].id + 1;
  const newTalker = { id: addId, name, age, talk };

  fileContent.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(fileContent));
  res.status(201).json(newTalker);
});

module.exports = userRoute;