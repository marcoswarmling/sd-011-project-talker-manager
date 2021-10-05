const router = require('express').Router();

const { readFile, writeFile } = require('../helper/readWriteHelper');
const { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares/validation');

const PATHNAME = './talker.json';

router.get('/', async (_req, res) => {
  const result = await readFile(PATHNAME) || [];
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile(PATHNAME);
  const talker = result.find((item) => item.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

router.post('/',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const talker = req.body;
  const file = await readFile(PATHNAME);
  talker.id = file[file.length - 1].id + 1;
  file.push(talker);
  await writeFile(PATHNAME, file);
  res.status(201).json(talker);
});

router.put('/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const talker = req.body;
  const { id } = req.params;
  talker.id = parseInt(id, 10);

  const file = await readFile(PATHNAME);
  const index = file.findIndex((item) => item.id === parseInt(id, 10));

  if (index === -1) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  file[index] = { ...talker };

  await writeFile(PATHNAME, file);
  
  res.status(200).json(talker);
});

module.exports = router;