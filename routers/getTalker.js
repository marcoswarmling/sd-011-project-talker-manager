const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const talkersAll = async () => {
    const talkerFile = './talker.json';
    const talkers = await fs.readFile(talkerFile);
    return JSON.parse(talkers);
  };

  const talkersFilteredByID = async (sId) => {
    const talkerFile = './talker.json';
    const talkers = await fs.readFile(talkerFile);
    const talkerParse = JSON.parse(talkers);
   return talkerParse.find(({ id }) => id === sId);
  };

router.get('/', async (_req, res) => {
    const getTalker = await talkersAll();
res.status(200).send(getTalker);
});

router.get('/:id', async (req, res) => {
const response = req.params;
const getTalker = await talkersFilteredByID(Number(response.id));
if (!getTalker) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
}

res.status(200).send(getTalker);
});

module.exports = router;