const express = require('express');
const { readFile, writeFile } = require('../utils/useFiles');
const {
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkBody,
  validateTalkeBodyInfos,
} = require('../middlewares/validateNewTalker');

const router = express.Router();

router.get(
  '/',
  async (_req, res) => {
    try {
      const talkers = await readFile();

      if (talkers.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(talkers);
    } catch (err) {
      return res.status(404).json({ code: err.code, message: err.message });
    }
  },
);

router.get(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
  
      const talkers = await readFile();
  
      const findTalker = talkers.find((talker) => talker.id === Number(id));
  
      if (!findTalker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
  
      res.status(200).json(findTalker);
    } catch (err) {
      return res.status(404).json({ code: err.code, message: err.message });
    }
  },
);

router.post(
  '/',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkBody,
  validateTalkeBodyInfos,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;

      const talkers = await readFile();
      const lastId = talkers[talkers.length - 1].id;

      console.log(lastId);

      const newTalkers = [...talkers, { name, age, id: lastId + 1, talk }];

      await writeFile(newTalkers);

      res.status(201).json({ name, age, id: lastId + 1, talk });
    } catch (err) {
      return res.status(404).json({ code: err.code, message: err.message });
    }
  },
);

module.exports = router;
