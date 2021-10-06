const router = require('express').Router();
const fs = require('fs').promises;
const { generateToken,
  emailValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  watchedAtAndDateValidation } = require('./validationFunctions');

const talkerFile = './talker.json';

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(talkerFile);
  const result = JSON.parse(talkers);
  res.status(200).json(result);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.readFile(talkerFile);
  const { id } = req.params;
  const result = JSON.parse(talkers);

  const talker = result.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({
    token: generateToken(16),
  });
});

router.post('/talker', tokenValidation, nameValidation, ageValidation, 
watchedAtAndDateValidation, (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
    const { name, age, talk } = req.body;
    const addTalker = { name, age, talk: { ...talk }, id: talkers.length + 1 };

    talkers.push(addTalker);

    fs.writeFileSync(talkerFile, JSON.stringify(talkers));
    return res.status(201).json(addTalker);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
