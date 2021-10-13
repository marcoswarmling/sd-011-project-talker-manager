const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const {
  validateName,
  validateAge,
  validateToken,
  validateTalk,
} = require('../middlewares/newTalker');

router.post('/talker', validateName, validateAge, validateToken, validateTalk, async (req, res) => {
  const { name, age, talk } = req.body;

  const data = await fs.readFile('../talker.json', 'utf-8');
  const talker = JSON.parse(data);

  const id = talker.length + 1;

  talker.push({ id, name, age, talk });
  await fs.newfile('../talker.json', JSON.stringify(talker));
  return res.status(201).json({ name, age, talk, id });
});

module.exports = router;
