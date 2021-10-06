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

router.put('/:id',
validateToken,
validateAge,
validateName,
validateTalk,
validateTalkIncrements,
async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = fs.readFileSync('./talker.json', 'utf8');
    const talkerParse = JSON.parse(talkers);
    const talkerIndex = talkerParse.findIndex((talker) => talker.id === +id);
    const editedTalker = { id: +id, name, age, talk };
    talkerParse[talkerIndex] = editedTalker;
   fs.writeFileSync('./talker.json', JSON.stringify(talkerParse, null, 2));
    return res.status(200).json(editedTalker);
});

/* router.delete('/:id',
validateToken,
validateAge,
validateName,
validateTalk,
validateTalkIncrements,
async (req, res) => {
    const { id } = req.params;
    const talkers = fs.readFileSync('./talker.json', 'utf8');
    const talkerParse = JSON.parse(talkers);
    const talkerIndex = talkerParse.findIndex((talker) => talker.id === +id);
    talkerParse.splice(1, talkerIndex);
   fs.writeFileSync('./talker.json', JSON.stringify(talkerParse, null, 2));
    return res.status(200).json(talkerParse);
}); */

module.exports = router;
