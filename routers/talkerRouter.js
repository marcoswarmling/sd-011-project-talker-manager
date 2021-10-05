const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const talkerRouter = express();
talkerRouter.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const talkerNotFound = {
  message: 'Pessoa palestrante não encontrada',
};

talkerRouter.get('/', rescue(async (_request, response) => {
  const file = await fs.readFile('./talker.json', 'utf8');
  if (!file) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).json(JSON.parse(file));
}));

talkerRouter.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const file = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(file).find((item) => item.id === Number(id));
  if (!talker) return response.status(HTTP_NOT_FOUND_STATUS).json(talkerNotFound);
  response.status(HTTP_OK_STATUS).json(talker);
}));

module.exports = talkerRouter;
