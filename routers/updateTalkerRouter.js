const router = require('express').Router();

const fs = require('fs').promises;

const { getTalkers } = require('../helpers');

const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
} = require('../middlewares/validations');

router.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
   async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const talker = { name, age, id: parseInt(id, 10), talk };
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));

  talkers[talkerIndex] = talker;

  const atualizedTalker = JSON.stringify([...talkers]);
  await fs.writeFile('talker.json', atualizedTalker);

  res.status(200).json(talker);
  },
);

module.exports = router;