const express = require('express');

const routerPost = express.Router();
const { writeContentFile } = require('../helpers/useFile');
const {
  validationToken,
  validationName, 
  validationAge } = require('../middlewares/validateNewTalker');

const PATH_FILE = './talker.json';

routerPost.post(
  '/', 
  validationName,
  validationAge,
  validationToken,
  async (req, res) => {
    const newTalker = {
        ...req.body,
        rate: req.body.talk.rate.Number(),
    };

    const talker = await writeContentFile(PATH_FILE, newTalker);

    res.status(201).json(talker);
  },
);

module.exports = routerPost;
