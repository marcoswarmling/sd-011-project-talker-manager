 const express = require('express');
 const fs = require('fs');

const talkerJSON = './talker.json';
  const { 
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateTalkIncrements,
} = require('../middlewares/ValidatePostTalker'); 

 const router = express.Router();

router.get('/', (_req, res) => {
  const file = fs.readFileSync(talkerJSON, 'utf8');
  if (!file) return res.status(200).json([]);
  res.status(200).json(JSON.parse(file));
});

 router.get(
  '/search',
  validateToken,
  (req, res) => {
    const { q } = req.query;
    const talkersList = fs.readFileSync(talkerJSON, 'utf8');
    const talkerParse = JSON.parse(talkersList);
    const talker = talkerParse.filter((item) => item.name.includes(q));
    if (!q) {
 res.status(200).send(talkerParse);
    } else { res.status(200).send(talker); }
  },
);

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk, 
  validateTalkIncrements,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerContent = fs.readFileSync(talkerJSON);
  const talker = JSON.parse(talkerContent);
  const id = talker[talker.length - 1].id + 1;
  talker.push({ id, name, age, talk });
  await fs.writeFileSync(talkerJSON, JSON.stringify(talker, null, 2));
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
    const talkers = fs.readFileSync(talkerJSON, 'utf8');
    const talkerParse = JSON.parse(talkers);
    const talkerIndex = talkerParse.findIndex((talker) => talker.id === +id);
    const editedTalker = { id: +id, name, age, talk };
    talkerParse[talkerIndex] = editedTalker;
   fs.writeFileSync(talkerJSON, JSON.stringify(talkerParse, null, 2));
    return res.status(200).json(editedTalker);
});

router.delete('/:id', validateToken, (req, res) => {
    const { id } = req.params;
      const talkers = JSON.parse(fs.readFileSync(talkerJSON, 'utf8'));
      const newList = talkers.filter((talker) => Number(talker.id) !== Number(id));
      fs.writeFileSync(talkerJSON, JSON.stringify(newList));
      res.status(200).json({
        message: 'Pessoa palestrante deletada com sucesso',
      });
  });

 router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = fs.readFileSync('./talker.json', 'utf8');
  const result = JSON.parse(talkers);
  const talker = result.find((person) => person.id === parseInt(id, 10));
if (!talker) {
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
} return res.status(200).json(talker);
}); 

module.exports = router; 