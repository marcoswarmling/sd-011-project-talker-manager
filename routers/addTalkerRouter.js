const router = require('express').Router();

const fs = require('fs').promises;

const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
} = require('../middlewares/validations');

// Solução para retornar o último elemento do array encontrada em
// https://pt.stackoverflow.com/questions/87416/como-retornar-o-%C3%BAltimo-registro-de-um-array-com-javascript-ou-jquery

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

  const talkers = JSON.parse(await fs.readFile('talker.json'));
  console.log(talkers);

  const id = talkers.length + 1;

  const addNewTalker = { name, age, id, talk };

  talkers.push(addNewTalker);

  const newTalker = JSON.stringify([...talkers, addNewTalker]);
  await fs.writeFile('talker.json', newTalker);

  console.log(talkers);
  res.status(201).json(addNewTalker);
  },
);

module.exports = router;
