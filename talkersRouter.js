const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

function readTalker() {
  const fileData = fs.readFile('./talker.json', 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.log(`Erro na leitura, erro: ${err}`);
      process.exit(1);
    });
  return fileData;
}

async function writeTalker(name, age, watchedAt, rate) {
  const talkers = await readTalker();
  const newTalker = {
    name,
    age,
    id: talkers.length + 1,
    talk: {
      rate,
      watchedAt,
    },
  };

  fs.writeFile('./talker.json', JSON.stringify([...talkers, newTalker]))
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
}

router.get('/:id', async (req, res) => {
  const talkers = await readTalker();

  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(talker);
});

router.get('/', async (_req, res) => {
  const talkers = await readTalker();

  return res.status(200).json(talkers);
});

const tokenValidator = require('./tokenValidator');
const {
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
} = require('./validateRegistration');

router.post(
  '/',
  tokenValidator,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
    (req, res) => {
    const { id, name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const newTalker = { id, name, age, talk: { watchedAt, rate } };
    
    writeTalker(name, age, watchedAt, rate);
    res.status(201).json(newTalker);
  },
);

module.exports = router;