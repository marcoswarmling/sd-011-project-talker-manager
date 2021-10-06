const express = require('express');
const fs = require('fs');

const router = express.Router();
const { 
    validateToken,
    validateAge,
    validateName,
    validateTalk,
    validateTalkIncrements,
} = require('../middlewares/ValidatePostTalker');

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk, 
  validateTalkIncrements,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerContent = fs.readFileSync('./talker.json');
  const talker = JSON.parse(talkerContent);
  const id = talker[talker.length - 1].id + 1;
  talker.push({ id, name, age, talk });
  await fs.writeFileSync('./talker.json', JSON.stringify(talker, null, 2));
  return res.status(201).json({ id, name, age, talk });
});

module.exports = router;