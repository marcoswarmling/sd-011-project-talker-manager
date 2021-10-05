const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const talkersRead = () => {
  const talkersPromise = new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((fileContent) => {
      if (fileContent) {
        resolve(fileContent);
      } else {
        reject(new Error('Não encontrei o arquivo talker.json'));
      }
    });
  });
  return talkersPromise;
};

router.get('/', async (req, res) => {
  const talkersPersons = await talkersRead();
  if (talkersPersons) return res.status(200).json(talkersPersons);
  res.status(200).json([]);
});

module.exports = router;
