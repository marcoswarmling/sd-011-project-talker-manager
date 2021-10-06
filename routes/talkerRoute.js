const { Router } = require('express');

const fs = require('fs').promises;

const router = Router();

router.get('/', async (_req, res) => {
    const dados = await fs.readFile('./talker.json');
    res.status(200).json(JSON.parse(dados));
  });
module.exports = router;