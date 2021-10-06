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

router.get(
  '/search',
  tokenAuthentication,
  async (req, res) => {
    const { searchTerm } = req.query;
    const talkers = await readFileContent('./talker.json') || [];

    if (!searchTerm || searchTerm === '') {
      return res.status(200).json(talkers);
    }

    const filteredTalkersByQuery = talkers.filter((talker) => talker.name.includes(searchTerm)); 
    if (filteredTalkersByQuery.length === 0) return res.status(200).json([]);

    return res.status(200).json(filteredTalkersByQuery);
  },
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).json(talkerById);
});

router.get('/', async (_req, res) => {
  const fileContent = await readFileContent('./talker.json') || [];
  res.status(200).json(fileContent);
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
