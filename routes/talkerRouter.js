const router = require('express').Router();

const { 
  readFileContent,
  getTalkerById,
  writeFileContent,
} = require('../utils/utils');

const { 
  tokenAuthentication, 
  nameValidation, 
  ageValidation, 
  talkValidation,
  rateValidation,
  watchedAtValidation,
} = require('../middlewares/middlewares');

router.get('/', async (_req, res) => {
  const fileContent = await readFileContent('./talker.json') || [];
  res.status(200).json(fileContent);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerById);
});

router.post(
  '/',
  tokenAuthentication,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async (req, res) => {
    const newTalker = req.body;
    const newTalkerWithId = await writeFileContent('./talker.json', newTalker);
    return res.status(201).json(newTalkerWithId);
  },
);

module.exports = router;
