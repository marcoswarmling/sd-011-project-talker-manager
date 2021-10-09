const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  res.status(200).json({ name });
});

module.exports = router;
