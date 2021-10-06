const router = require('express').Router();
const randonToken = require('random-token');
const fs = require('fs').promises;

const {
  isValidtoken,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isvalidateFields,
  isvalidateTalkObject,
  isvalidateTalk,
  isvalidateRate,
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
  async (req, res) => {
    const { name, age, talk } = req.body;

    try {
      const talkers = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
      const id = talkers.length + 1;
      const newTalker = { name, age, id, talk };
      talkers.push(newTalker);

      await fs.writeFile('./talker.json', JSON.stringify(talkers));
      return res.status(201).json(newTalker);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
});

// requisito 5
router.post('/talker',
  isValidtoken,
  isValidName, 
  isValidAge,
  isvalidateTalk,
  isvalidateRate,
  isvalidateFields,
  isvalidateTalkObject,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    try {
      const talkers = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
      const editedTalker = { name, age, talk, id: Number(id) };
      const newList = talkers.map((talker) => {
        if (Number(talker.id) === Number(id)) {
          return editedTalker;
        }
        return talker;
      });
  
      fs.writeFileSync('./talker.json', JSON.stringify(newList));
      console.log(newList);
      res.status(200).json(editedTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = router;