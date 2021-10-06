const router = require('express').Router();
// const bodyParser = require('body-parser');

// router.use(bodyParser.json);

const { getTalkers, updateTalkers } = require('../helpers/readFile');
const { checkToken } = require('../middlewares/checkToken');
const { checkTalker } = require('../middlewares/checkTalker');
const { checkTalk, checkDate, checkRate } = require('../middlewares/checkTalk');

const file = 'talker.json';

router.get('/search', checkToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkers(file);
  if (!q) {
    return res.status(200).json(talkers);
  }
  const filteredTalkers = talkers.filter((t) => t.name.includes(q));
  
  if (!filteredTalkers) {
    return res.status(200).json([]);
  }
  res.status(200).json(filteredTalkers);
});

router.get('/', async (_req, res) => {
  const talkers = await getTalkers(file);
  if (!talkers) res.status(200).json([]);

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkers(file);
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
  const currentTalkers = await getTalkers(file);
  const newTalkers = [...currentTalkers, newDataTalker];

  try {
    await updateTalkers(file, newTalkers);
  } catch (error) {
    return res.status(401).end();
  }

  res.status(201).json(newDataTalker);
});

router.put('/:id', checkToken, checkTalker, checkTalk, checkDate, checkRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newDataTalker = {
    name,
    age,
    talk: { watchedAt, rate },
  };
  const currentTalkers = await getTalkers(file);
  const idUpdateTalk = currentTalkers.findIndex((t) => t.id === parseInt(id, 10));
  currentTalkers[idUpdateTalk] = { ...currentTalkers[idUpdateTalk], ...newDataTalker };
  await updateTalkers(file, currentTalkers);
  res.status(200).json(currentTalkers[idUpdateTalk]);
});

router.delete('/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const currentTalkers = await getTalkers(file);
  const deletedTalkers = currentTalkers.filter((t) => t.id !== parseInt(id, 10));
  await updateTalkers(file, deletedTalkers);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
