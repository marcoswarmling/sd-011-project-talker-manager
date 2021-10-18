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

router.post('/talker', 
  isValidAge, 
  isValidName, 
  isValidToken,
  isValidDate,
  isValidRate,
  isValidTalk,
  rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fsUtils.getTalker() || [];
  const talker = { name, age, talk };
  talkers.push(talker);
  await fsUtils.setTalker(talkers);
  return res.status(201).json(talker);
}));

module.exports = router;