const router = require('express').Router();
const fs = require('fs');
const { readContentTalker } = require('../helpers/readFile');
const { writeContentTalker } = require('../helpers/writeFile');
const emailValidate = require('../helpers/validations/emailValidations');
const passwordValidate = require('../helpers/validations/passwordValidations');
const ageValidate = require('../helpers/validations/ageValidation');
const nameValidate = require('../helpers/validations/nameValidation');
const talkValidate = require('../helpers/validations/talkValidation');
const rateValidate = require('../helpers/validations/rateValidation');
const watchedAtValidate = require('../helpers/validations/watchedAtValidation');
const tokenValidate = require('../helpers/validations/tokenValidation');

router.get('/talker', async (_req, res) => {
  const dataTalker = await readContentTalker('./talker.json') || [];
  res.status(200).json(dataTalker);
});

router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const dataId = fs.readFileSync('./talker.json', 'utf-8');
    const talkerId = JSON.parse(dataId);
    
    const talkers = talkerId.find((item) => item.id === Number(id));
    
    if (!talkers) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    res.status(200).json(talkers);
  });

router.post('/login', emailValidate, passwordValidate, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
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
  const talker = await readContentTalker('/talker.json');
  const newTalker = { age, id: talker.length + 1, name, talk };
  talker.push(newTalker);
  await writeContentTalker('./talker.json', newTalker);
  res.status(201).json(newTalker);
},
);

module.exports = router;