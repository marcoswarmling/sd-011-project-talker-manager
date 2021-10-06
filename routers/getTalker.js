const express = require('express');
const fs = require('fs');
//const { validateToken } = require('../middlewares/ValidatePostTalker');

const router = express.Router();

router.get('/', (_req, res) => {
  const file = fs.readFileSync('./talker.json', 'utf8');
  if (!file) return res.status(200).json([]);
  res.status(200).json(JSON.parse(file));
});

/*router.get(
  '/search',
  validateToken,
  (req, res) => {
    const { q } = req.query;
    const talkersList = fs.readFileSync('./talker.json', 'utf8');
    const talkerParse = JSON.parse(talkersList);
    const talker = talkerParse.filter((item) => item.name.includes(q));
    if (!q) {
 res.status(200).send(talkerParse);
    } else { res.status(200).send(talker); }
  },
);

router.get('/:id', (req, res) => {
  const talkers = fs.readFileSync('./talker.json', 'utf-8');
  const IdResponse = req.params.id;
  const parseTalkers = JSON.parse(talkers);
 const filteredTalkers = parseTalkers.find(({ id }) => id === Number(IdResponse));

 if (!filteredTalkers) {
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
  return res.status(200).json(filteredTalkers);
});
*/
module.exports = router;