const router = require('express').Router();

const { getTalkers, updateTalkers } = require('../helpers/readFile');
const { checkToken } = require('../middlewares/checkToken');
const { checkTalker, checkTalk, checkDate, checkRate } = require('../middlewares/checkTalker');

router.get('/', async (_request, response) => {
  const talkers = await getTalkers('talker.json');
  if (!talkers) response.status(200).json([]);

  response.status(200).json(talkers);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  const talkers = await getTalkers('talker.json');
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
  const currentTalkers = await getTalkers('talker.json');
  const newTalkers = [...currentTalkers, newTalker];

  try {
    await updateTalkers('talker.json', newTalkers);
  } catch (error) {
    return res.status(401).end();
  }

  res.status(201).json(newTalker);
});

module.exports = router;
