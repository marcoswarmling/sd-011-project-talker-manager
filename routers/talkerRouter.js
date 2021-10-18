const router = require('express').Router();
const fs = require('fs').promises;
const crypto = require('crypto');
// const { readContentTalker } = require('../helpers/readFile');
// const { writeContentTalker } = require('../helpers/writeFile');
const emailValidate = require('../helpers/validations/emailValidations');
const passwordValidate = require('../helpers/validations/passwordValidations');
const tokenValidate = require('../helpers/validations/tokenValidation');
const ageValidate = require('../helpers/validations/ageValidation');
const nameValidate = require('../helpers/validations/nameValidation');
const talkValidate = require('../helpers/validations/talkValidation');
const rateValidate = require('../helpers/validations/rateValidation');
const watchedAtValidate = require('../helpers/validations/watchedAtValidation');

const talkerJson = './talker.json'; 
router.get('/talker', async (_req, res) => {
  try {
    const dataTalker = await fs.readFile(talkerJson, 'utf-8');
    return res.status(200).json(JSON.parse(dataTalker));
  } catch (error) {
      return res.status(200).json([]);
  }
});

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await fs.readFile(talkerJson, 'utf-8');
    const talkerId = JSON.parse(talker).find((item) => item.id === parseInt(id, 10));
    
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }    
    res.status(200).json(talkerId);
  });

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/login', emailValidate, passwordValidate, (_req, res) => {
    res.status(200).json({ token: generateToken() });
  });

router.post(
'/talker',
tokenValidate,
ageValidate,
nameValidate,
talkValidate,
rateValidate,
watchedAtValidate, async (req, res) => {
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;
    const data = await fs.readFile(talkerJson, 'utf-8');
    const talkers = JSON.parse(data);
    const id = talkers.length + 1;
    const newTalker = { name, age, id, talk: { rate, watchedAt } };

    talkers.push(newTalker);
    fs.writeFile(talkerJson, JSON.stringify(talkers));
    
    res.status(201).json(newTalker);
},
);

router.put('/talker/:id',
tokenValidate,
ageValidate,
nameValidate,
talkValidate,
rateValidate,
watchedAtValidate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await fs.readFile(talkerJson, 'utf-8'));

  const editTalker = { id: Number(id), name, age, talk };

  const newTalkers = talkers.map((talker) => {
    if (Number(talker.id) === Number(id)) return editTalker;
    return talker;
  });
  await fs.writeFile(talkerJson, JSON.stringify(newTalkers));
  res.status(200).json(editTalker);  
});

module.exports = router;