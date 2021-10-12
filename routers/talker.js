const router = require('express').Router();

const { getFileData } = require('../services/CRUD');

router.get('/', async (_req, res) => {
  const result = await getFileData();
  res.status(200).json(result);
});

module.exports = router;