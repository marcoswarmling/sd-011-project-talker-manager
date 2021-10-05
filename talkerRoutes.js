const express = require('express');
const { readFile } = require('./handleJson');

const router = express.Router();

router.get('/', async (req, res) => {
  const readJson = await readFile();
  res.status(200).json(readJson);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readJson = await readFile();
  const findPerson = readJson.findIndex((el) => Number(el.id) === Number(id));

  if (findPerson === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(readJson[findPerson]);
});

router.post('/', (_req, _res) => {

});

router.put('/:id', (_req, _res) => {

});

router.delete('/:id', (_req, _res) => {

});

router.get('/search', (_req, _res) => {

});

module.exports = router;