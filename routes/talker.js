const router = require('express').Router();
const fs = require('fs').promises;
const { validateToken } = require('../middleware/authorization');
const { validateName, validateAge } = require('../middleware/validateParams');
const { validateTalk, validateSubTalk } = require('../middleware/validateParams2');

router.get('/', async (_req, res) => {
  const fileContent = await fs.readFile('./talker.json');
  const people = JSON.parse(fileContent);
  return res.status(200).json(people);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const fileContent = await fs.readFile('./talker.json');
  const people = JSON.parse(fileContent);
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
  const fileContent = await fs.readFile('./talker.json');
  const people = JSON.parse(fileContent);
  const id = people[people.length - 1].id + 1;
  people.push({ id, name, age, talk });
  await fs.writeFile('./talker.json', JSON.stringify(people, null, 2));
  return res.status(201).json({ id, name, age, talk });
});

module.exports = router;