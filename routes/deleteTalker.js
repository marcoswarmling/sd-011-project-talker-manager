// Requisito 6 pt2
const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const { tokenIsValid } = require('../midlewares/validateOtherTalker');

router.delete('/:id', tokenIsValid, async (req, res) => {
  const { id } = req.params;

  const content = await fs.readFile('./talker.json');
  const talkList = JSON.parse(content);

  const talkIndex = talkList.findIndex((t) => t.id === Number(id));
  talkList.splice(talkIndex, 1);

  const stringfy = JSON.stringify(talkList);
  await fs.writeFile('./talker.json', stringfy);
  return res
    .status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
