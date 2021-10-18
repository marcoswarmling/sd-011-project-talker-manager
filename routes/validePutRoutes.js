const express = require('express');
const fs = require('fs').promises;
const {
  valideToken,
  valideName,
  valideAge,
  valideTalk,
  valideRate,
  valideDateFormat,
  valideRateDate,
} = require('../middlewares/putValide');

const validePutRoutes = express.Router();
const dadosTalker = './talker.json';

validePutRoutes.put('/:id',
valideToken,
valideName,
valideAge,
valideTalk,
valideRate,
valideDateFormat,
valideRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const fileContent = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));
  const temporario = fileContent.filter((t) => t.id !== Number(req.params.id));

  const updatedTalker = { name, age, talk, id: Number(id) };
  const updateList = [...temporario, updatedTalker];
  await fs.writeFile('./talker.json', JSON.stringify(updateList));
  return res.status(200).json(updatedTalker);
});

module.exports = validePutRoutes;