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
} = require('../middlewares/useValidar');

const usuarioRoute = express.Router();
const dadosTalker = './talker.json';
const conteudo = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));

usuarioRoute.get('/search', valideToken,
async (req, res) => {
  const { q } = req.query;
  // const conteudo = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));
  const index = conteudo.filter((nome) => nome.name.includes(q));
  return res.status(200).json(index);
});

usuarioRoute.get('/', async (_req, res) => {
  try {
    // const conteudo = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));
    return res.status(200).json(conteudo);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

usuarioRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // const conteudo = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
    const data = conteudo.find((t) => t.id === Number(id));
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

usuarioRoute.post('/',
valideToken,
valideName,
valideAge,
valideTalk,
valideRate,
valideDateFormat,
valideRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  // const conteudo = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));
  const addId = conteudo.length + 1;
  const newTalker = { id: addId, name, age, talk };

  conteudo.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(conteudo));
  return res.status(201).json(newTalker);
});

usuarioRoute.put('/:id',
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
  // const conteudo = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));
  const temporario = conteudo.filter((t) => t.id !== Number(req.params.id));

  const ttalker = { name, age, talk, id: Number(id) };
  const list = [...temporario, ttalker];
  await fs.writeFile('./talker.json', JSON.stringify(list));
  return res.status(200).json(ttalker);
});

usuarioRoute.delete('/:id', valideToken,
async (req, res) => {
  const { id } = req.params;
   //const conteudo = JSON.parse(await fs.readFile(dadosTalker, 'utf8'));
  const index = conteudo.filter((t) => t.id !== Number(id));
  conteudo.push(index);
  await fs.writeFile(dadosTalker, JSON.stringify(index));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = usuarioRoute;