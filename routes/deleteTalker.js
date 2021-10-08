// Requisito 6
const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const validateToken = require('../middlewares/validateNewTalker');

router.delete('/:id', validateToken.verifyTokenIsValid, async (req, res) => {
  const { id } = req.params;
  
  const array = await fs.readFile('./talker.json');
  const talkersList = JSON.parse(array);

  const talkersIndex = talkersList.findIndex((t) => t.id === Number(id));
  talkersList.splice(talkersIndex, 1); // removerei 1 palestrante, na posição do index.

  const stringfy = JSON.stringify(talkersList);
  await fs.writeFile('./talker.json', stringfy);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
