const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', async (req, res, next) => {
  try {
    const db = await fs.readFile('./talker.json', 'utf8')
    .then((data) => JSON.parse(data));
    return res.status(200).json(db);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const db = await fs.readFile('./talker.json', 'utf8')
  .then((data) => JSON.parse(data));
  const talker = db.find((t) => t.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
  next();
});

// router.post('/:id', async (req, res, next) => {
//   const { id } = req.params;
//   const db = await fs.readFile('./talker.json', 'utf8')
//   .then((data) => JSON.parse(data));
//   const talker = db.find((t) => t.id === +id);
//   if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
//   res.status(200).json({ talker });
//   next();
// });

module.exports = router;