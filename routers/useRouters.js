const router = require('express').Router();
const randonToken = require('random-token');
const fs = require('fs').promises;

const {
  isValidEmail,
  isValidPassword,
  isValidTalk,
  isValidAge,
  isValidName,
  isValidToken,
  isValidRate,
  isValidWatchedAt,
} = require('../middlewares/validations');

router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => {
  try {
    const token = randonToken(16);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  },
);

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
    try {
      const talkerData = await fs.readFile('./talker.json', 'utf8');
      const talker = JSON.parse(talkerData);

      const id = talker.length + 1;
      const newUser = { name, age, id, talk };
      talker.push(newUser);
      await fs.writeFile('./talker.json', JSON.stringify(talker));
      return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  },
);

router.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    try {
      const talkerData = await fs.readFile('./talker.json', 'utf8');
      const talker = JSON.parse(talkerData);
      const userIndex = talker.findIndex((user) => user.id === Number(id));
      talker[userIndex] = ({ ...talker[userIndex], name, age, talk });
      await fs.writeFile('./talker.json', JSON.stringify(talker));
      const newUser = talker.find((user) => user.id === Number(id));
      return res.status(200).json(newUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  },
);

module.exports = router;