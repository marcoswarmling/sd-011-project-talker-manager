const router = require('express').Router();
const TalkerModel = require('../models/talkerModel');

const HTTP_OK_STATUS = 200;

router.get('/', async (req, res) => {
  try {
    const response = await TalkerModel.getAll();

    if (!response) {
      res.status(HTTP_OK_STATUS).json([]);
    }

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;