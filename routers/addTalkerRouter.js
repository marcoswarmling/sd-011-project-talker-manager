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

router.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
   async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await getTalkers();

  const id = talkers.length + 1;

  const addNewTalker = { name, age, id, talk };

  const newTalker = JSON.stringify([...talkers, addNewTalker]);
  await fs.writeFile('talker.json', newTalker);

  res.status(201).json(addNewTalker);
  },
);

module.exports = router;
