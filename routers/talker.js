const router = require('express').Router();
const {
  readContent,
  writeContent,
  updateContent,
} = require('../services/fileHandler');

const {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
} = require('../middlewares/talkerValidations');

const talkerDB = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContent(talkerDB) || [];
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContent(talkerDB) || [];
  const talker = talkers.find((obj) => obj.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.use(
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
);
router.post('/', async (req, res) => {
  const newEntry = await writeContent(talkerDB, req.body);
  return res.status(201).json(newEntry);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEntry = await updateContent(talkerDB, req.body, id);
  return res.status(200).json(updatedEntry);
});

module.exports = router;