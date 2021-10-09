const express = require('express');

const fs = require('fs').promises;

const router = express.Router();
const { readContentFile } = require('../helpers/useFile');
const {
  validationToken,
  validationName, 
  validationAge, 
  validationTalk,
  validationWatched,
  validationRate } = require('../middlewares/validateNewTalker');

const PATH_FILE = './talker.json';

router.post(
  '/', 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      
      const talker = await readContentFile(PATH_FILE);
      const newTalker = { id: talker.length + 1, name, age, talk };
      talker.push(newTalker);
      
      await fs.writeFile(PATH_FILE, JSON.stringify(talker));
      
      res.status(201).json(newTalker);
    } catch (error) {
      return ({ message: error.message, code: error.code });
    }
  },
);
  
module.exports = router;
