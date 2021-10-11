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

async function addTalker(name, age, watchedAt, rate) {
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

    return newTalker;
  }

async function updateTalker(id, newTalker) {
  const talkers = await readTalker();
  const findTalker = talkers.find((t) => t.id === id);

  talkers.splice(talkers.indexOf(findTalker), 1, newTalker);

  fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
}

async function deleteTalker(id) {
  const talkers = await readTalker();
  const findIndexTalker = talkers.indexOf(id);

  talkers.splice(findIndexTalker, 1);

  fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then((data) => JSON.parse(data.splice(findIndexTalker, 1)))
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
} 
  
const tokenValidator = require('./tokenValidator');
const {
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
} = require('./validateRegistration');

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

router.post(
  '/',
  tokenValidator,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
    async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const newTalker = await addTalker(name, age, watchedAt, rate);

    res.status(201).json(newTalker);
  },
);

router.put(
  '/:id',
  tokenValidator,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const newTalker = { name, age, id: Number(id), talk: { watchedAt, rate } };

    await updateTalker(id, newTalker);

    return res.status(200).json(newTalker);
  },
);

router.delete(
  '/:id',
  tokenValidator,
  async (req, res) => {
    const { id } = req.params;

    deleteTalker(id);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = router;