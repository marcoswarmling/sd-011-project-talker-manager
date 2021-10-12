const express = require('express');

const router = express.Router();

const {
  readTalker,
  addTalker,
  updateTalker,
  deleteTalker,
  getByQuery,
} = require('../helpers');
 
const tokenValidator = require('../middlewares/tokenValidator');
const {
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
} = require('../middlewares/validateRegistration');

router.get('/search', tokenValidator, async (req, res) => {
  const { q } = req.query;
  const result = await getByQuery(q);

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const talkers = await readTalker();

  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(talker);
});

router.get('/', async (_req, res) => {
  const talkers = await readTalker();
  
  return res.status(200).json(talkers);
});

router.post(
  '/',
  tokenValidator,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const newTalker = await addTalker(name, age, watchedAt, rate);
  
    res.status(201).json(newTalker);
  },
);

router.put(
  '/:id',
  tokenValidator,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const newTalker = { name, age, id: Number(id), talk: { watchedAt, rate } };
    
    await updateTalker(id, newTalker);

    return res.status(200).json(newTalker);
  },
);

router.delete('/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;

  deleteTalker(id);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
    
module.exports = router;