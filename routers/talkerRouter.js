const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const { readFile } = require('../helper/readFile');

const {
  withOutName,
  tokenValid,
  ageValid,
  talkValid,
  rateInterval,
  validWatchedAt,
} = require('../middlewares/newTalker');

router.get('/', async (_req, res) => {
  const talker = await readFile();
  return res.status(200).json(talker);
});

router.get('/search', tokenValid, async (req, res) => {
  const { q } = req.query;
  const talker = await readFile();

  const searchTalker = talker.filter((p) => p.name.includes(q));

  return res.status(200).json(searchTalker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
  const talkerId = talker.find((t) => t.id === Number(id));

  if (!talkerId) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(talkerId);
});

// router.post('/',
//   validateName,
//   validateAge,
//   validateToken,
//   validateTalk,
//   validateWatchedAt,
//   validateRate,
//   async (req, res) => {
//   const { name, age, talk } = req.body;
//   const talker = await readFile();
//   const id = talker.length + 1;

//   talker.push({ id, name, age, talk });
//   await fs.writeFile('../talker.json', JSON.stringify(talker));
//   return res.status(201).json({ name, age, talk, id });
// });

router.put('/:id',
  withOutName,
  tokenValid,
  ageValid,
  talkValid,
  rateInterval,
  validWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talker = await readFile();

    const talkerIndex = talker.findIndex((t) => t.id === Number(id));

    talker[talkerIndex] = { ...talker[talkerIndex], name, age, talk };
    await fs.writeFile('../talker.json', JSON.stringify(talker));

    const updateTalker = talker.find((t) => t.id === Number(id));
    return res.status(200).json(updateTalker);
  });

module.exports = router;
