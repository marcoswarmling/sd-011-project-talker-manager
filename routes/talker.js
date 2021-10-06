const router = require('express').Router();
const fs = require('fs').promises;
const { readFileContent } = require('../helper/fs');
const { validateToken } = require('../middleware/authorization');
const { validateName, validateAge } = require('../middleware/validateParams');
const { validateTalk, validateSubTalk } = require('../middleware/validateParams2');

router.get('/', async (_req, res) => {
  const people = await readFileContent();
  return res.status(200).json(people);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const people = await readFileContent();
  const filter = people.find((value) => value.id === Number(id));

  if (!filter) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(filter);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk, 
  validateSubTalk,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const people = await readFileContent();
  const id = people[people.length - 1].id + 1;

  people.push({ id, name, age, talk });

  await fs.writeFile('./talker.json', JSON.stringify(people, null, 2));
  return res.status(201).json({ id, name, age, talk });
});

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateSubTalk,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const people = await readFileContent();
  const indexPeople = people.findIndex((p) => p.id === Number(id));

  if (!indexPeople) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  people[indexPeople] = { ...people[indexPeople], name, age, talk };

  await fs.writeFile('./talker.json', JSON.stringify(people, null, 2));

  return res.status(200).json({ id: Number(id), name, age, talk });
});

module.exports = router;
