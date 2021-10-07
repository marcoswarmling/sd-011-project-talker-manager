const router = require('express').Router();
const fs = require('fs').promises;

const tokenValidation = require('../middlewares/tokenValidation');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');
const talkValidation = require('../middlewares/talkValidation');
const watchedAtValidation = require('../middlewares/watchedAtValidation');
const rateValidation = require('../middlewares/rateValidation');

const allValidations = [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
];

router.get('/', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  return res.status(200).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf8');
  const findId = JSON.parse(talker).find(
    (element) => element.id === Number(id),
  );
  if (!findId) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findId);
});

router.post('/', allValidations, async (req, res) => {
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;

  const talkerInformation = await fs.readFile('./talker.json', 'utf8');
  const parseTalkerInformation = JSON.parse(talkerInformation);
  const id = parseTalkerInformation.length + 1;

 const newTalk = { id, name, age, talk: { rate, watchedAt } };

parseTalkerInformation.push(newTalk);
await fs.writeFile('./talker.json', JSON.stringify(parseTalkerInformation));
return res.status(201).json(newTalk);
});

module.exports = router;
