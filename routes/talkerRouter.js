const router = require('express').Router();

const { 
  readFileContent,
  getTalkerById,
  writeFileContent,
  editTalker,
  deleteTalker,
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
    const currentContent = await readFileContent('./talker.json');
    const updatedTalker = { ...req.body, id: currentContent.length + 1 };
    const newTalkerWithId = await writeFileContent('./talker.json', updatedTalker);
    return res.status(201).json(newTalkerWithId);
  },
);

router.put(
  '/:id',
  tokenAuthentication,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async (req, res) => {
    const { id } = req.params;
    const editTalkerInfo = req.body;
    const updatedTalkers = await editTalker(id, editTalkerInfo);
    return res.status(200).json(updatedTalkers);
  },
);

router.delete(
  '/:id',
  tokenAuthentication,
  async (req, res) => {
    const { id } = req.params;
    await deleteTalker(id);
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = router;
