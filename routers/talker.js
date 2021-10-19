const router = require('express').Router();
const fs = require('fs').promises;
const {
  validToken,
  validName,
  validAge,
  validWatchedAt,
  validRate,
  validExistsTalk,
} = require('../middlewars/talker');

const DataBase = 'talker.json';

router.get('/', async (_req, res) => {
  try {
    const readTalkers = await fs.readFile(DataBase, 'utf-8');
    const parseReadTalkers = JSON.parse(readTalkers);
    if (!parseReadTalkers) return res.status(200).json([]);

    return res.status(200).json(parseReadTalkers);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.get('/search', validToken, async (req, res) => {
  const { q = '' } = req.query;
  try {
    const searchByQuery = await fs.readFile(DataBase, 'utf-8');
    const parseSearchByQuery = JSON.parse(searchByQuery);

    const filterQuery = parseSearchByQuery.filter((talker) => talker.name.includes(q));

    return res.status(200).json(filterQuery);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const searchById = await fs.readFile(DataBase, 'utf-8');
    const parseSearchById = JSON.parse(searchById)
    .find((talker) => talker.id === Number(id));

    if (!parseSearchById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }

    return res.status(200).json(parseSearchById);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.post('/', validToken, validName, validAge,
validExistsTalk, validWatchedAt, validRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const readTalkers = await fs.readFile(DataBase, 'utf-8');
  const parseReadTalkers = JSON.parse(readTalkers);
  const id = parseReadTalkers.length > 0 ? parseReadTalkers[parseReadTalkers.length - 1].id + 1 : 1;

  const newTalker = { id, name, age, talk: { watchedAt, rate } };

  parseReadTalkers.push(newTalker);
  await fs.writeFile(DataBase, JSON.stringify(parseReadTalkers));

  return res.status(201).json(newTalker);
});

router.put('/:id', validToken, validName, validAge,
validExistsTalk, validWatchedAt, validRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const editTalker = { id: Number(id), name, age, talk: { watchedAt, rate } };

  const readTalkers = await fs.readFile(DataBase, 'utf-8');
  const parseReadTalkers = JSON.parse(readTalkers);

  const indexIdTalker = parseReadTalkers.findIndex((talker) => Number(talker.id) === Number(id));
  parseReadTalkers[indexIdTalker] = editTalker;

  await fs.writeFile(DataBase, JSON.stringify(parseReadTalkers));
  
  return res.status(200).json(editTalker);
});

router.delete('/:id', validToken, async (req, res) => {
  const { id } = req.params;

  const readTalkers = await fs.readFile(DataBase, 'utf-8');
  const parseReadTalkers = JSON.parse(readTalkers);

  const removeTalker = parseReadTalkers.filter((talker) => talker.id !== Number(id));

  await fs.writeFile('talker.json', JSON.stringify(removeTalker));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
