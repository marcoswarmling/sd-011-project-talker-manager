const router = require('express').Router();
const rescue = require('express-rescue');

const { getTalkers, setTalkers } = require('../services/fs-utils');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('../middlewares/talkerValidate');

  router.get('/', rescue(async (_req, res) => {
    const talkers = await getTalkers();
    return res.status(200).json(talkers);
  }));
  
  router.get('/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talker = talkers.find((t) => t.id === Number(id));
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  }));

  router.post('/', 
validateToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateWatchedAt,
rescue(async (req, res) => {
  const talkers = await getTalkers();
  talkers.push({ id: talkers.length + 1, ...req.body });
  await setTalkers(talkers);
  res.status(201).json(talkers[talkers.length - 1]);
}));

module.exports = router;
