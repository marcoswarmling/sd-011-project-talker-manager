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
  
        const newTalkers = [...talkers, { name, age, id: lastId + 1, talk }];
  
        await writeFile(newTalkers);
  
        res.status(201).json({ name, age, id: lastId + 1, talk });
      } catch (err) {
        return res.status(404).json({ code: err.code, message: err.message });
      }
    },
  );

  router.put(
    '/:id',
    validateToken,
    validateTalkerName,
    validateTalkerAge,
    validateTalkBody,
    validateTalkeBodyInfos,
    async (req, res) => {
      try {
        const { name, age, talk } = req.body;
        const { id } = req.params;
        const talkers = await readFile();
        const findTalker = talkers.find((talker) => talker.id === Number(id));
  
        if (!findTalker) return res.status(400).json({ message: 'Talker not found' });
        const updateTalkers = talkers.map((talker) => {
          if (talker.id === Number(id)) return { id: Number(id), name, age, talk };
          return talker;
        });
  
        await writeFile(updateTalkers);
  
        res.status(200).json({ id: Number(id), name, age, talk });
      } catch (err) {
        return res.status(404).json({ code: err.code, message: err.message });
      }
    },
  );

  router.get(
    '/search',
    validateToken,
    async (req, res) => {
      try {
        const { q } = req.query;
        const talkers = await readFile();
  
        if (!q) return res.status(200).json(talkers);
  
        const findByTalkerName = talkers.filter((talker) => talker.name.includes(q));
  
        res.status(200).send(findByTalkerName);
      } catch (err) {
        return res.status(404).json({ code: err.code, message: err.message });
      }
    },
  );
  
  router.delete(
    '/:id',
    validateToken,
    async (req, res) => {
      try {
        const { id } = req.params;
        const talkers = await readFile();
        const findTalker = talkers.findIndex((talker) => talker.id === Number(id));
  
        if (findTalker === -1) return res.status(400).json({ message: 'Talker not found' });
  
        const updatedTalkers = talkers.filter((talker) => talker.id !== Number(id));
  
        await writeFile(updatedTalkers);
  
        res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
      } catch (err) {
        return res.status(404).json({ code: err.code, message: err.message });
      }
    },
  );

  module.exports = router;
