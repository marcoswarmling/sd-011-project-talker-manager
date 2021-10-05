const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const talkerRouter = express();
talkerRouter.use(express.json());

const HTTP_OK_STATUS = 200;

talkerRouter.get('/', rescue(async (_request, response) => {
  const file = await fs.readFile('./talker.json', 'utf8');
  if (!file) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).json(JSON.parse(file));
}));

module.exports = talkerRouter;
