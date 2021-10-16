const router = require('express').Router();
const TalkerModel = require('../models/talkerModel');

const HTTP_OK_STATUS = 200;

router.get('/', async (_req, res) => {
  try {
    const response = await TalkerModel.getAll();

    if (!response) {
      res.status(404).json([]);
    }

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TalkerModel.getById(id);

    if (!response) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(HTTP_OK_STATUS).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;