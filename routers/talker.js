const router = require('express').Router();

const {
  getFileData,
  setFileData,
  editFileData,
} = require('../services/CRUD');
const {
  checkToken,
  checkName,
  checkAge,
  checkWatchedAt,
  checkRate,
  checkTalk,
} = require('../middlewares/talkerMiddleware');

router.get('/', async (_req, res) => {
  const result = await getFileData();

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getFileData();
  const personById = result.find((person) => person.id === parseInt(id, 10));
  
  if (!personById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(personById);
});

router.use(
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
);

router.post('/', async (req, res) => {
  const result = await setFileData(req.body);
  res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await editFileData(id, req.body);
  res.status(200).json(result);
});

module.exports = router;