const router = require('express').Router();
const fs = require('fs').promises;
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
} = require('../middlewares/validations');

const getTalkers = async () => {
  try {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
  } catch (error) {
    return null;
  }
};

router.get('/talker', async (_req, res) => {
  const talkers = await getTalkers() || [];
  return res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers() || [];

  const dados = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!dados) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(dados);
});

router.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const talkerPosition = talkers.length + 1;
    const talker = { id: talkerPosition, name, age, talk };
    console.log(talkers);
    talkers.push(talker);
    await fs.writeFile('./talkers.json', JSON.stringify(talkers));
    return res.status(201).json(talker);
  });

/*  ||
app.put('/talker/:id', () => {});
app.delete('/talker/:id', () => {});
app.get('/talker/search?q=searchTerm', () => {}); */

module.exports = router;