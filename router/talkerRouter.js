const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

// const tokenValidation = require('../validation/tokenValidation');

const db = './talker.json';

router.get('/', async (_req, res) => {
  const response = await fs.readFile(db, 'utf-8');
  if (response.length === 0) return res.status(200).send([]);
  return res.status(200).json(JSON.parse(response));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(db, 'utf-8');
  const result = JSON.parse(response).find((talker) => Number(talker.id) === Number(id));
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(result);
});

module.exports = router;