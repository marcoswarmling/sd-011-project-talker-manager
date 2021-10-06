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
const talke = './talker.json';
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
      const talkerData = await fs.readFile(talke, 'utf8');
      const talker = JSON.parse(talkerData);

      const id = talker.length + 1;
      const newUser = { name, age, id, talk };
      talker.push(newUser);
      await fs.writeFile(talke, JSON.stringify(talker));
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
    try {
      const talkerData = await fs.readFile(talke, 'utf8');
      const talker = JSON.parse(talkerData);
      const userIndex = talker.findIndex((user) => user.id === +id);
      if (userIndex === -1) return res.status(404).json({ message: 'Id não encontrado' });
      talker[userIndex] = { ...req.body, id: Number(id) };
      await fs.writeFile('./talker.json', JSON.stringify(talker));
      return res.status(200).json(talker[userIndex]);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  },
);

router.get('/talker/search', isValidToken, async (req, res) => {
  const { q } = req.query;
  try {
    const talkers = await JSON.parse(fs.readFile('./talker.json', 'utf-8'));
    const filter = talkers.filter((talker) =>
      talker.name.toLowerCase().includes(q.toLowerCase()));

    return res.status(200).json(filter);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete(
  '/talker/:id',
  isValidToken,
  async (req, res) => {
    const { id } = req.params;
    try {
      const talkerData = await fs.readFile(talke, 'utf8');
      const talker = JSON.parse(talkerData);
      const userIndex = talker.findIndex((user) => user.id === +id);
      talker.splice(userIndex, 1);
      await fs.writeFile('./talker.json', JSON.stringify(talker));
      return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  },
);

module.exports = router;