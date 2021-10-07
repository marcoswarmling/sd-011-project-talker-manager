const router = require('express').Router();
const randonToken = require('random-token');
const fs = require('fs').promises;

const {
  isValidateEmail,
  isValidatePassword,
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateRate,
  isValidateTalk,
  isValidateWatchedAt,
} = require('../middlewares/validations');

// requisito 3
router.post(
  '/login',
  isValidateEmail,
  isValidatePassword,
  (_req, res) => {
    const token = randonToken(16);
    res.status(200).json({ token });
  },
);

// requisito 4
router.post('/talker',
isValidateToken,
isValidateName, 
isValidateAge,
isValidateTalk,
isValidateRate,
isValidateWatchedAt,
  async (req, res) => {
    const { name, age, talk } = req.body;

    try {
      const talkers = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
      const id = talkers.length + 1;
      const newTalker = { name, age, id, talk };
      talkers.push(newTalker);

      await fs.writeFileSync('./talker.json', JSON.stringify(talkers));
      return res.status(201).json(newTalker);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
});

// requisito 5
router.put('/talker/:id',
  isValidateToken,
  isValidateName, 
  isValidateAge,
  isValidateTalk,
  isValidateRate,
  isValidateWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
      const newList = talkers.findIndex((talker) => talker.id === id);
      if (newList === -1) return res.status(404).json({ message: 'Id não encontrado' });
      talkers[newList] = { ...req.body, id: Number(id) };
      await fs.writeFileSync('./talker.json', JSON.stringify(talkers));
      console.log(newList);
      return res.status(200).json(talkers[newList]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
});

// requisito 6
router.delete('/talker/:id',
  isValidateToken,
  async (req, res) => {
    const { id } = req.params;
      const talkers = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
      const newList = talkers.findIndex((talker) => talker.id === +id);
      talkers.splice(newList, 1);
      await fs.writeFile('./talker.json', JSON.stringify(talkers));
      return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

module.exports = router;