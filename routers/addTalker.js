const { Router } = require('express');

const router = Router();

const fs = require('fs');

const validateNewTalker = require('../middlewares/validationNewTalker');

router.post('/', validateNewTalker, (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(content);
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers, null, 2));
  res.status(201).json(newTalker);
});

module.exports = router;