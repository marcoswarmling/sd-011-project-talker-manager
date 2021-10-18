const express = require('express');
const fs = require('fs').promises;

const { checarToken } = require('../middlewares/delete');

const rota = express.Router();
const lista = './talker.json';

rota.get('/search', checarToken,
async (req, res) => {
  const { q } = req.query;
  const conteudo = JSON.parse(await fs.readFile(lista, 'utf8'));
  const index = conteudo.filter((esse) => esse.name.includes(q));
  return res.status(200).json(index);
});

module.exports = rota;