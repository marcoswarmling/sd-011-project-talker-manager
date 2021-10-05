const express = require('express');
const { readFile, writeFile, editTalker, deleteTalker } = require('./handleJson');
const { validateUpdate } = require('./validateUpdate');
const validateDelete = require('./validateDelete');
const getLastId = require('./retrieveLastId');

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

router.post('/', validateUpdate, async (req, res) => {
  const { name, age, talk } = req.body;
  const lastId = await getLastId();
  const obj = {
    id: lastId,
    name,
    age,
    talk,
  };
  writeFile(obj);
  res.status(201).json(obj);
});

router.put('/:id', validateUpdate, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const obj = {
    name,
    age,
    talk,
  };
  const edited = await editTalker(id, obj);
  res.status(200).json(edited);
});

router.delete('/:id', validateDelete, (req, res) => {
  const { id } = req.params;
  deleteTalker(id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// router.get('/search', (_req, _res) => {

// });

module.exports = router;