const router = require('express').Router();
const { readFile, writeFile } = require('../utils/fsutils');
const { 
  isValidToken, 
  isValidName, 
  isValidAge, 
  isValidTalk, 
  isValidWatchedAt, 
  isValidRate, 
} = require('../middlewares/validations.js');

const jsonTalker = 'talker.json';

router.get('/talker', async (_req, res) => {
  const result = await readFile(jsonTalker);
  if (result.length < 1) return res.status(200).json([]);
  res.status(200).json(result);
});

router.get('/talker/search', isValidToken, async (req, res) => {
  const { q } = req.query;
  const talker = await readFile(jsonTalker);
  const filteredTalker = talker.filter((e) => e.name.includes(q));
  res.status(200).json(filteredTalker);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile(jsonTalker);

  const talkerById = result.find((e) => Number(e.id) === Number(id));

  if (!talkerById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerById);
});

router.post('/talker', 
  isValidToken, 
  isValidAge, 
  isValidName, 
  isValidTalk,
  isValidWatchedAt, 
  isValidRate,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await readFile(jsonTalker);
  
  talker.push({ age, id: talker.length + 1, name, talk });
  await writeFile(jsonTalker, talker);

  res.status(201).json({ age, id: talker.length, name, talk });
});

router.put('/talker/:id', 
  isValidToken, 
  isValidName, 
  isValidAge, 
  isValidTalk, 
  isValidRate, 
  isValidWatchedAt, 
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await readFile(jsonTalker);
  const updateTalker = talker
    .map((e) => (Number(e.id) === Number(id) ? { name, age, id: Number(id), talk } : e));

  await writeFile(jsonTalker, updateTalker);

  const talkerById = updateTalker.find((e) => Number(e.id) === Number(id));
  res.status(200).json(talkerById);
});

router.delete('/talker/:id', isValidToken, async (req, res) => {
  const { id } = req.params;
  const talker = await readFile(jsonTalker);
  const indexOfTalker = talker.findIndex((e) => Number(e.id) === Number(id));

  talker.splice(indexOfTalker, 1);
  await writeFile(jsonTalker, talker);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;