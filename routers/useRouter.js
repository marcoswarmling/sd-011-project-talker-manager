const router = require('express').Router();
const randonToken = require('random-token');
const fs = require('fs').promises;

const fileTalker = './talker.json';

const {
  isValidtoken,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isvalidateFields,
  isvalidateTalkObject,
  isvalidateTalk,
} = require('../middlewares/validations');

// requisito 3
router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => {
    const token = randonToken(16);
    res.status(200).json({ token });
  },
);

// requisito 4
router.post('/talker',
  isValidtoken,
  isValidName, 
  isValidAge,
  isvalidateTalk,
  isvalidateFields,
  isvalidateTalkObject,
  (req, res) => {
    const { name, age, talk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(fileTalker, 'utf8'));
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = { name, age, talk, id: Number(lastTalker.id) + 1 };
      talkers.push(newTalker);

      fs.writeFileSync(fileTalker, JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = router;