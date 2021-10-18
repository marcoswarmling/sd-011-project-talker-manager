const router = require('express').Router();
const fs = require('fs').promises;
const crypto = require('crypto');
const { readContentTalker } = require('../helpers/readFile');
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
  const dataTalker = await readContentTalker(talkerJson) || [];
  res.status(200).json(dataTalker);
});

router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const dataId = fs.readFileSync(talkerJson, 'utf-8');
    const talkerId = JSON.parse(dataId);
    
    const talkers = talkerId.find((item) => item.id === Number(id));
    
    if (!talkers) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    res.status(200).json(talkers);
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
    const data = await fs.readFile(talkerJson, 'utf-8');
    const talkers = JSON.parse(data);
    const id = talkers.length + 1;
    const newTalker = { name, age, id, talk: { ...talk } };

    talkers.push(newTalker);
    fs.writeFile(talkerJson, JSON.stringify(talkers));
    
    res.status(201).json(newTalker);
},
);

module.exports = router;