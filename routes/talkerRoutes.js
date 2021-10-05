const express = require('express');
const readFile = require('../utils/useFiles');

const router = express.Router();

router.get(
  '/',
  async (_req, res) => {
    try {
      const talkers = await readFile('./talker.json');

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
  
      const talkers = await readFile('./talker.json');
  
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

module.exports = router;
