const router = require('express').Router();
const fs = require('fs').promises;

const { readTalkerFile, getTalker } = require('../helpers/validations');

const { validateToken } = require('../helpers/validateToken');
const validateTalker = require('../helpers/validateTalker');

router.get('/', async (_req, res) => {
  readTalkerFile()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const data = await readTalkerFile();
  if (!q || q === '') return res.status(200).json(data);

  const newData = data.filter((t) => t.name.includes(q));
  res.status(200).json(newData);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalker(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.use(validateToken);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const exists = await getTalker(id);
  if (!exists) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  const data = await readTalkerFile();
  const newData = data.filter((t) => Number(t.id) !== Number(id));
  await fs.writeFile('./talker.json', JSON.stringify(newData, null, 2));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(validateTalker);

router.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = { name, age, talk };
  const data = await readTalkerFile();
  const talkerData = {
    ...talker,
    id: data.length + 1,
  };
  await fs.writeFile('./talker.json', JSON.stringify([...data, talkerData], null, 2));
  res.status(201).json(talkerData);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const exists = await getTalker(id);
  if (!exists) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  let talker = { name, age, talk };
  const data = await readTalkerFile();
  const newData = data.map((t) => {
    if (Number(t.id) === Number(id)) {
      talker = { ...talker, id: t.id };
      return talker;
    }
    return t;
  });
  await fs.writeFile('./talker.json', JSON.stringify(newData, null, 2));
  res.status(200).json(talker);
});

module.exports = router;
