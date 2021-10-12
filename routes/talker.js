const router = require('express').Router();
const fs = require('fs').promises;

const dataBase = './talker.json';

const validAge = require('../middlewares/validAge');
const validName = require('../middlewares/validName');
const validNewTalker = require('../middlewares/validNewTalker');
const validRate = require('../middlewares/validRate');
const validToken = require('../middlewares/validToken');
const validWatchedAt = require('../middlewares/validWatchedAt');

const validatedNewTalker = [
  validToken,
  validName,
  validAge,
  validNewTalker,
  validRate,
  validWatchedAt,
];

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(dataBase, 'utf8');
  res.status(200).json(JSON.parse(talkers));
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(dataBase, 'utf8');
  const search = JSON.parse(talkers).find((item) => item.id === Number(id));
  if (!search) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(search);
});

router.post('/talker', validatedNewTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;
  const talkers = await fs.readFile(dataBase, 'utf8');
  const talkerParse = JSON.parse(talkers);
  const id = talkerParse.length + 1;
  const newTalker = {
    id,
    name,
    age,
    talk: {
      rate,
      watchedAt,
    },
  };

  talkerParse.push(newTalker);
  await fs.writeFile(dataBase, JSON.stringify(talkerParse));
  return res.status(201).json(newTalker);
});

router.put('/talker/:id', validatedNewTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const newTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const talkers = await fs.readFile(dataBase, 'utf8');
  const talkerParse = JSON.parse(talkers);
  const index = talkerParse.findIndex((item) => item.id === Number(id));

  talkerParse[index] = newTalker;
  await fs.writeFile(dataBase, JSON.stringify(talkerParse));

  return res.status(200).json(newTalker);
});

module.exports = router;
