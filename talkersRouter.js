const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

function readTalker() {
  const fileData = fs.readFile('./talker.json', 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.log(`Erro na leitura, erro: ${err}`);
      process.exit(1);
    });
  return fileData;
}

router.get('/', async (_req, res) => {
  const talkers = await readTalker();

  return res.status(200).json(talkers);
});

module.exports = router;