const router = require('express').Router();
const rescue = require('express-rescue');
const { auth } = require('../middlewares/auth.js');
const { getTalkers, setTalkers } = require('../fs-utils');
const { nameVal, ageVal, talkVal1, talkVal2 } = require('../middlewares/validations');

router.get('/:id', rescue(async (req, res) => {
  const talkers = await getTalkers();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  } 

  return res.status(200).json(talker);
}));

router.get('/', rescue(async (req, res) => {
  const talkers = await getTalkers();
  if (talkers.length === 0) return res.status(200).send([]);
  
  return res.status(200).json(talkers);
}));

router.post('/', auth,
  nameVal,
  ageVal,
  talkVal1,
  talkVal2,
  rescue(async (req, res) => {
  const currentTalkers = await getTalkers();
  const { name, age, talk } = req.body;
  const newTalker = { id: currentTalkers.length + 1, name, age, talk };
  const newTalkers = [...currentTalkers, newTalker];
  await setTalkers(newTalkers);

  return res.status(201).json(newTalker);
}));

module.exports = router;