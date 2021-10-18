const express = require('express');
const fs = require('fs').promises;
const {
  validarToken,
  validarName,
  validarAge,
  validarTalk,
  validarRate,
  validarDateFormat,
  validarRateDate,
} = require('../middlewares/useValidar');

const routi = express.Router();
const DADOS = './talker.json';

routi.post('/',
validarToken,
validarName,
validarAge,
validarTalk,
validarRate,
validarDateFormat,
validarRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const resDados = JSON.parse(await fs.readFile(DADOS, 'utf8'));
  
  const adicionaId = resDados.length + 1;
  const newTalker = { id: adicionaId, name, age, talk };

  fileContent.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(resDados));
  return res.status(201).json(newTalker);
});

module.exports = routi