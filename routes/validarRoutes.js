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

routi.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync(DADOS, 'utf-8');
    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

routi.get('/?q', validarToken, (req, res) => {
  const { q } = req.query;
  try {
    const conteudo = JSON.parse(fs.readFileSync(DADOS, 'utf8'));
    
    const filtro = conteudo.filter((talker) => talker.name.includes(q));
    return res.status(200).json(filtro);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

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

  resDados.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(resDados));
  return res.status(201).json(newTalker);
});

routi.delete('/:id', validarToken,
async (req, res) => {
  const { id } = req.params;
  const Conteudo = JSON.parse(await fs.readFile(DADOS, 'utf8'));
  const index = Conteudo.filter((esse) => esse.id !== Number(id));
  Conteudo.push(index);
  await fs.writeFile(DADOS, JSON.stringify(index));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = routi;