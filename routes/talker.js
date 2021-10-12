const router = require('express').Router();

const fs = require('fs').promises;

const autenticaToken = require('./autenticacao/autenticaToken');
const autenticaName = require('./autenticacao/autenticaName');
const autenticaAge = require('./autenticacao/autenticaAge');
const autenticaTalk = require('./autenticacao/autenticaTalk');
const autenticaWatchedAt = require('./autenticacao/autenticaWatchedAt');
const autenticaRate = require('./autenticacao/autenticaRate');

const db = './talker.json';

const autenticacao = [autenticaToken, autenticaName,
  autenticaAge, autenticaTalk, autenticaRate, autenticaWatchedAt];

router.get('/', async (_req, res) => {
  const talker = await fs.readFile(db, 'utf-8');
  res.status(200).json(JSON.parse(talker));
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await fs.readFile(db, 'utf-8');
    const talkerId = JSON.parse(talkers).find((t) => t.id === Number(id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerId);
  });

  router.post('/', autenticacao, async (req, res) => {
    const { name, age, talk } = req.body;
    const { rate, watchedAt } = talk;
    const talkers = await fs.readFile(db, 'utf-8');
    const resultTalkers = JSON.parse(talkers);
    const id = resultTalkers.length + 1;
  
    const person = { id, name, age, talk: { rate, watchedAt } };
    resultTalkers.push(person);
  
    await fs.writeFile(db, JSON.stringify(resultTalkers));
    return res.status(201).json(person);
  });

module.exports = router;