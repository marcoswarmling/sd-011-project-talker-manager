const router = require('express').Router();

const { 
  readContentFile,
  writeContentFile,
  removeContentFile,
  editContentFile,
  searchContentFile,
} = require('../helpers/readWriteFile');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middleware/validations');

const TALKER = './talker.json';

router.get('/', async (_req, res) => {
  const talker = await readContentFile(TALKER) || [];
  res.status(200).json(talker);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query; 
  const searchContent = await searchContentFile(TALKER, q);
  res.status(200).json(searchContent);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readContentFile(TALKER) || [];
  const checkId = talker.find((item) => item.id === Number(id));
  if (!checkId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(checkId);
});

router.use(validateToken); // middleware global

router.delete('/:id', async (req, res) => {
  const { id } = req.params;  
  await removeContentFile(TALKER, id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
);

router.post('/', async (req, res) => {
  const talker = await writeContentFile(TALKER, req.body);
  res.status(201).json(talker);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await editContentFile(TALKER, id, req.body);
  res.status(200).json(talker);
});

module.exports = router;
