const router = require('express').Router();

const fs = require('fs').promises;

const { getTalkers } = require('../helpers');

const { isValidToken } = require('../middlewares/validations');

router.delete(
  '/talker/:id',
  isValidToken,
   async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkers();

  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

  await talkers.splice(talkerIndex, 1);

  const deleteTalker = JSON.stringify([...talkers]);
  await fs.writeFile('talker.json', deleteTalker);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = router;