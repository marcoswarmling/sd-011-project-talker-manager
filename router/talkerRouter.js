const router = require('express').Router();
const { 
  readContentFile,
  writeContentFile,
  removeContentFile,
} = require('../helpers/readWriteFile');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middleware/validations');

router.get('/', async (_req, res) => {
  const talker = await readContentFile('./talker.json') || [];
  res.status(200).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readContentFile('./talker.json') || [];
  const checkId = talker.find((item) => item.id === Number(id));
  if (!checkId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(checkId);
});

// router.use(validateToken); // middleware global?

router.post('/',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const talker = await writeContentFile('./talker.json', req.body);
  res.status(201).json(talker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await removeContentFile('./talker.json', id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
