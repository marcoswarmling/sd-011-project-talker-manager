const router = require('express').Router();
// const bodyParser = require('body-parser');

// router.use(bodyParser.json);

const { getTalkers, updateTalkers } = require('../helpers/readFile');
const { checkToken } = require('../middlewares/checkToken');
const { checkTalker } = require('../middlewares/checkTalker');
const { checkTalk, checkDate, checkRate } = require('../middlewares/checkTalk');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers('talker.json');
  if (!talkers) res.status(200).json([]);

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkers('talker.json');
  if (!talkers) res.status(200).json([]);

  const findTalker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!findTalker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

router.post('/', checkToken, checkTalker, checkTalk, checkDate, checkRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newDataTalker = {
    id: 5,
    name,
    age,
    talk: { watchedAt, rate },
  };
  console.log(newDataTalker);
  const currentTalkers = await getTalkers('talker.json');
  const newTalkers = [...currentTalkers, newDataTalker];

  try {
    await updateTalkers('talker.json', newTalkers);
  } catch (error) {
    return res.status(401).end();
  }

  res.status(201).json(newDataTalker);
});

module.exports = router;