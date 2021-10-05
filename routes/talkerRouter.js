const router = require('express').Router();

const talkersJson = require('../helper/fs');
const validateToken = require('../helper/validations/validateToken');
const validateName = require('../helper/validations/validateName');
const validateAge = require('../helper/validations/validateAge');
const validateTalk = require('../helper/validations/validateTalk');

router.get('/', async (req, res) => {
  const data = await talkersJson();

  res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await talkersJson();

  const findTalker = data.find((talker) => Number(talker.id) === Number(id));

  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

router.post('/', validateName, validateAge, validateTalk, validateToken, (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAT, rate } = talk;
  
  const personCadastered = {
    name,
    age,
    talk: {
      watchedAT,
      rate,
    },
  };

  res.status(201).json(personCadastered);
});

module.exports = router;