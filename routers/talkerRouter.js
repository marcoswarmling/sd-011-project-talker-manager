const router = require('express').Router();
const rescue = require('express-rescue');
const fsUtils = require('../services/fs-utils');
const { isValidToken, isValidAge, isValidName, 
  isValidDate, isValidRate, isValidTalk } = require('../middlewares/talkerMiddleware');

router.get('/', rescue(async (_req, res) => {
  const talkers = await fsUtils.getTalker();
  if (!talkers) {
    return res.status(200).json(talkers);
  } 
  return res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await fsUtils.getTalker() || [];
  const talker = talkers.find((t) => parseInt(t.id, 10) === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
}));

router.post('/', 
  isValidToken,
  isValidName, 
  isValidAge, 
  isValidTalk,
  isValidDate,
  isValidRate,
  rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fsUtils.getTalker();
  const id = talkers.length + 1;
  const newEntry = [...talkers, { name, age, id, talk }];
  await fsUtils.setTalker(newEntry);
  return res.status(201).json({ name, age, id, talk });
}));

router.put('/',
isValidToken,
isValidName, 
isValidAge, 
isValidTalk,
isValidDate,
isValidRate,
rescue(async (req, res) => {
const { name, age, talk, id } = req.body;
const talkers = await fsUtils.getTalker();
const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
talkers[talkerIndex] = { name, age, id, talk };
await fsUtils.setTalker(talkers);
return res.status(200).json({ name, age, id, talk });
}));

module.exports = router;