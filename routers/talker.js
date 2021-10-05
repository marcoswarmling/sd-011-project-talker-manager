const router = require('express').Router();
const {
    readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');
const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
} = require('../middlewares/validations');

router.get('/', async (_req, res) => {
    const talkers = await readContentFile('./talker.json') || [];

    res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile('./talker.json');
  const findTalker = talkers.find((people) => people.id === parseInt(id, 10));

    if (!findTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}

    res.status(200).json(findTalker);
});

router.post('/',
isValidToken,
isValidName,
isValidAge,
isValidTalk,
isValidWatchedAt,
isValidRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readContentFile('./talker.json') || [];
  const data = {
    name,
    age,
    id: talkers.length + 1,
    talk: {
      watchedAt,
      rate,
    },
  };
await writeContentFile('./talker.json', data);
res.status(201).json(data);
});

module.exports = router;