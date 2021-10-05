const express = require('express');

const router = express.Router();
const fs = require('fs');

const HTTP_OK_STATUS = 200;

router.get('/talker', (req, res) => {
  const data = fs.readFileSync('./talker.json');
  const talker = JSON.parse(data);
  if (talker.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(talker);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFileSync('./talker.json');
  const talker = JSON.parse(data);

  const talkerId = talker.find((person) => person.id === Number(id));

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(talkerId);
});

module.exports = router;
