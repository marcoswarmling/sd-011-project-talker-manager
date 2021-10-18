const bodyParser = require('body-parser');
const router = require('express').Router();
const TalkerModel = require('../models/talkerModel');

const authTalker = require('../middleware/authTalkerMiddleware');

const HTTP_OK_STATUS = 200;

router.use(bodyParser.json());

router.get('/', async (_req, res) => {
  try {
    const response = await TalkerModel.getAll();

    if (!response) {
      res.status(404).json([]);
    }

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  const { authorization: token } = req.headers;

  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) res.status(401).json({ message: 'Token inválido' });

  const { q } = req.query;

  const result = await TalkerModel.searchTalker(q);

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TalkerModel.getById(id);

    if (!response) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(HTTP_OK_STATUS).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', authTalker, async (req, res) => {
  const talker = await TalkerModel.create(req.body);

  res.status(201).json(talker);
});

router.put('/:id', authTalker, async (req, res) => {
  try {
    const { id } = req.params;
    const editedTalker = await TalkerModel.edit(req.body, id);
  
    res.status(200).json(editedTalker);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { authorization: token } = req.headers;

  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) res.status(401).json({ message: 'Token inválido' });

  const { id } = req.params;
  const deleteSuccessMessage = await TalkerModel.deleteTalker(id);

  res.status(200).json(deleteSuccessMessage);
});

module.exports = router;