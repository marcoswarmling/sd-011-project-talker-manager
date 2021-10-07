const { Router } = require('express');

const router = Router();

const fs = require('fs');

const validateTalker = require('../middlewares/validationTalkers');

router.put('/:id', validateTalker, (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(content);
  const { id } = req.params;
  const { name, age, talk } = req.body;
  
  const talkersIndex = talkers.findIndex((t) => t.id === +id);

  talkers[talkersIndex] = { id: +id, name, age, talk };

  fs.writeFileSync('./talker.json', JSON.stringify(talkers, null, 2));
  res.status(200).json(talkers[talkersIndex]);
});

module.exports = router;