const router = require('express').Router();
const rescue = require('express-rescue');
const fsUtils = require('../services/fs-utils');

router.get('/', rescue(async (_req, res) => {
  const talkers = await fsUtils.getTalker();
  if (!talkers) {
    return res.status(200).json(talkers);
  } 
  return res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await fsUtils.getTalker();
  const talker = talkers.find((t) => t.id === id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
}));

module.exports = router;