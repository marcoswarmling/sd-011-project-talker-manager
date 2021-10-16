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

router.get('/', async (_req, res) => {
  try {
    const readTalkers = await fs.readFile('talker.json', 'utf-8');
    const parseReadTalkers = JSON.parse(readTalkers);
    if (!parseReadTalkers) return res.status(200).json([]);

    return res.status(200).json(parseReadTalkers);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const searchById = await fs.readFile('talker.json', 'utf-8');
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

  const readTalkers = await fs.readFile('talker.json', 'utf-8');
  const parseReadTalkers = JSON.parse(readTalkers);
  const id = parseReadTalkers.length > 0 ? parseReadTalkers[parseReadTalkers.length - 1].id + 1 : 1;

  const newTalker = { id, name, age, talk: { watchedAt, rate } };

  parseReadTalkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(parseReadTalkers));
  return res.status(201).json(newTalker);
});

module.exports = router;
