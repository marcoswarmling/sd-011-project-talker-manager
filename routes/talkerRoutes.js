const router = require('express').Router();
const db = require('../auxiliary functions/getAndConvertInTalkers');

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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = Number(id);
  const data = await db.getTalkers();
  const talker = data.find((t) => t.id === talkerId);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.json(talker);
});

module.exports = router;