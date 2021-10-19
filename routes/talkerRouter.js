const express = require('express');
const fs = require('fs');
const { authValidator } = require('../middlewares/authValidator');
const { nameValidator } = require('../middlewares/nameValidator');
const { ageValidator } = require('../middlewares/ageValidator');
const { talkValidator, talkKeysValidator } = require('../middlewares/talkValidator');

const talkerJsonPath = './talker.json';

const talkerRouter = express.Router();

talkerRouter.get('/search',
authValidator,
async (req, res) => {
  const { q } = req.query;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);

  if (!q || q === '') return res.status(200).send(talkers);

  const filteredTalkers = talkers.filter((t) => t.name.includes(q));

  return res.status(200).send(filteredTalkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).send(talker);
});

talkerRouter.get('/', async (_req, res) => {
  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);

  if (!talkers.length) return res.status(200).send([]);

  return res.status(200).send(talkers);
});

talkerRouter.post('/',
authValidator,
nameValidator,
ageValidator,
talkValidator,
talkKeysValidator,
async (req, res) => {
  const { body } = req;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);
  const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };

  await fs.writeFileSync(talkerJsonPath, JSON.stringify([...talkers, newTalker]));

  return res.status(201).send({ ...newTalker });
});

talkerRouter.put('/:id',
authValidator,
nameValidator,
ageValidator,
talkValidator,
talkKeysValidator,
async (req, res) => {
  const { params: { id }, body } = req;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));
  const editedTalker = { ...talker, ...body };

  const editedTalkers = talkers.map((t) => {
    if (t.id === Number(id)) return editedTalker;
    return t;
  });

  await fs.writeFileSync(talkerJsonPath, JSON.stringify([...editedTalkers]));

  return res.status(200).send(editedTalker);
});

talkerRouter.delete('/:id',
authValidator,
async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);
  const filteredTalkers = talkers.filter((t) => t.id !== Number(id));

  await fs.writeFileSync(talkerJsonPath, JSON.stringify([...filteredTalkers]));

  return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = talkerRouter;