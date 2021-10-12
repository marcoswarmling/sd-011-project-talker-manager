const router = require('express').Router();
const db = require('../auxiliary functions/getAndConvertInTalkers');
const { 
  validationAge, 
  validationName, 
  validationTalk, 
  validationRate, 
  validationDate } = require('../middlewares/validationTalker');
const validationToken = require('../middlewares/validationToken');

const HTTP_OK_STATUS = 200;

router.get('/', async (_req, res, next) => {
  try {
    const data = await db.getTalkers();
    if (data.length === 0) {
      return res.status(HTTP_OK_STATUS).json([]);
    }
    res.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talkerId = Number(id);
  const data = await db.getTalkers();
  const talker = data.find((t) => t.id === talkerId);
  try {
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.json(talker);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/', 
  validationToken, 
  validationName, 
  validationAge, 
  validationTalk, 
  validationRate, 
  validationDate, 
  async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await db.getTalkers();
  const newTalker = { 
    id: data.length + 1, 
    name, 
    age: Math.floor(age), 
    talk,
   };
  data.push(newTalker);
  await db.setTalkers(data);

  res.status(201).json(newTalker);
},
);

router.put('/:id', 
  validationToken, 
  validationName, 
  validationAge, 
  validationTalk, 
  validationRate, 
  validationDate, 
  async (req, res) => { 
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await db.getTalkers();
    const indexTalker = data.findIndex((p) => p.id === Number(id));
      if (indexTalker === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });
    const newTalker = { 
      id: Number(id), 
      name, 
      age: Math.floor(age), 
      talk,
    };
    data[indexTalker] = newTalker;
    await db.setTalkers(data);
    res.status(200).json(newTalker);
  });

  router.delete('/:id', validationToken, async (req, res) => {
    const { id } = req.params;
    const data = await db.getTalkers();
    const indexTalker = data.findIndex((p) => p.id === Number(id));
      if (indexTalker === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });
      data.splice(indexTalker, 1);
    await db.setTalkers(data);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

module.exports = router;