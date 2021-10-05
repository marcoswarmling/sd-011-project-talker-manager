const router = require('express').Router();
const fs = require('fs').promises;

const data = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

router.get('/', async (_req, res) => {
  const response = await fs.readFile(data, 'utf-8');

  if (response.length < 1) return res.status(HTTP_OK_STATUS).send([]);

  return res.status(HTTP_OK_STATUS).json(JSON.parse(response));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await fs.readFile(data, 'utf-8');
  const result = JSON.parse(response).find((r) => r.id === Number(id));

  if (!result) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(result);
});

module.exports = router;
