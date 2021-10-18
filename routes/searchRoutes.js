const express = require('express');
const { readFile } = require('../middlewares/fs');

const searchRoutes = express.Router();

searchRoutes.get('/search', async (req, res) => {
  const lista = await readFile();
  const { q } = req.query;
  if (!q) {
    return res.status(200).json(lista);
  }
  lista.filter(({ name }) => name.includes(q));
  return res.status(200).json(lista);
});

module.exports = searchRoutes;