const router = require('express').Router();
const fs = require('fs').promises;

const isValidToken = require('../middlewares/isValidToken');
const isValidName = require('../middlewares/isValidName');
const isValidAge = require('../middlewares/isValidAge');
const isValidTalk = require('../middlewares/isValidTalk');
const isValidWatchedAt = require('../middlewares/isValidWatchedAt');
const isValidRate = require('../middlewares/isValidRate');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_ERROR_STATUS = 404;

const data = './talker.json';
const registerOrEditTalkers = [
  isValidToken, 
  isValidName, 
  isValidAge, 
  isValidTalk, 
  isValidWatchedAt, 
  isValidRate,
];

router.get('/', async (_req, res) => {
  const response = await fs.readFile(data, 'utf-8');

  if (response.length < 1) return res.status(HTTP_OK_STATUS).send([]);

  return res.status(HTTP_OK_STATUS).json(JSON.parse(response));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await fs.readFile(data, 'utf-8');
  const result = JSON.parse(response).find((r) => r.id === Number(id));

  if (!result) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(result);
});

router.post('/', registerOrEditTalkers, async (req, res) => {
  const { name, age, talk: { rate, watchedAt } } = req.body;

  const response = await fs.readFile(data, 'utf-8');
  const talkers = JSON.parse(response);
  const id = talkers.length + 1;

  const newTalker = { name, age, id, talk: { rate, watchedAt } };

  talkers.push(newTalker);
  await fs.writeFile(data, JSON.stringify(talkers));

  return res.status(HTTP_CREATED_STATUS).json(newTalker);
});

router.put('/:id', registerOrEditTalkers, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { rate, watchedAt } } = req.body;
  const talkers = { id: Number(req.params.id), name, age, talk: { rate, watchedAt } };
  const response = await fs.readFile(data, 'utf-8');
  const registeredTalkers = JSON.parse(response);

  const indexOfEditedTalkers = registeredTalkers.findIndex((t) => Number(t.id) === Number(id));
  registeredTalkers[indexOfEditedTalkers] = talkers;
  await fs.writeFile(data, JSON.stringify(registeredTalkers));

  return res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;
