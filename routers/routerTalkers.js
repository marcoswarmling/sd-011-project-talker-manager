const router = require('express').Router();

const { getTalkers } = require("../helpers/readFile");

router.get('/', async (_request, response) => {
  const talkers = await getTalkers('talker.json');
  if (!talkers) response.status(200).json([]);

  response.status(200).json(talkers);
});

module.exports = router;
