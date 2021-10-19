const router = require('express').Router();

const { getTalkers, updateTalkers } = require('../helpers/readFile');
const { checkToken } = require('../middlewares/checkToken');
const { checkTalker, checkTalk, checkDate, checkRate } = require('../middlewares/checkTalker');

const database = 'talker.json';

router.get('/', async (_request, response) => {
  const talkers = await getTalkers(database);
  if (!talkers) response.status(200).json([]);

  response.status(200).json(talkers);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  const talkers = await getTalkers(database);
  if (!talkers) response.status(200).json([]);
  const findTalker = talkers.find((target) => target.id === parseInt(id, 10));
  if (!findTalker) response.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  response.status(200).json(findTalker);
});

router.post('/', checkToken, checkTalker, checkTalk, checkDate, checkRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    id: 5,
    name,
    age,
    talk: { watchedAt, rate },
  };
  console.log(newTalker);
  const currentTalkers = await getTalkers(database);
  const newTalkers = [...currentTalkers, newTalker];

  try {
    await updateTalkers(database, newTalkers);
  } catch (error) {
    return res.status(401).end();
  }

  res.status(201).json(newTalker);
});

router.put('/:id', checkToken, checkTalker, checkTalk, checkDate, checkRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    name,
    age,
    talk: { watchedAt, rate },
  };
  const currentTalkers = await getTalkers(database);
  const idUpdateTalk = currentTalkers.findIndex((t) => t.id === parseInt(id, 10));
  currentTalkers[idUpdateTalk] = { ...currentTalkers[idUpdateTalk], ...newTalker };
  await updateTalkers(database, currentTalkers);
  res.status(200).json(currentTalkers[idUpdateTalk]);
});
  
module.exports = router;
