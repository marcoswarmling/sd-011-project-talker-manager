const express = require('express');
const rescue = require('express-rescue');
const { readTalker, writeTalker } = require('../services');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkAttributes,
} = require('../helpers');

const talkerRouter = express();
talkerRouter.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;

const errorMessages = {
  talkerNotFound: { message: 'Pessoa palestrante não encontrada' },
};

talkerRouter.get('/', rescue(async (_request, response) => {
  const file = await readTalker();
  if (!file) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).json(file);
}));

talkerRouter.post(
  '/',
  rescue(validateToken),
  rescue(validateName),
  rescue(validateAge),
  rescue(validateTalk),
  rescue(validateTalkAttributes),
  rescue(async (request, response) => {
    const file = await readTalker();
    const newTalker = { ...request.body, id: file.length + 1 };
    const data = JSON.stringify([...file, newTalker]);
    writeTalker(data);
    response.status(HTTP_CREATED_STATUS).json(newTalker);
  }),
);

talkerRouter.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const { talkerNotFound } = errorMessages;
  const file = await readTalker();
  const talker = file.find((item) => item.id === Number(id));
  if (!talker) return response.status(HTTP_NOT_FOUND_STATUS).json(talkerNotFound);
  response.status(HTTP_OK_STATUS).json(talker);
}));

talkerRouter.put(
  '/:id',
  rescue(validateToken),
  rescue(validateName),
  rescue(validateAge),
  rescue(validateTalk),
  rescue(validateTalkAttributes),
  rescue(async (request, response) => {
    const { id } = request.params;
    const file = await readTalker();
    const updatedTalker = { ...request.body, id: Number(id) };
    const data = JSON.stringify(
      file.map((item) => (item.id === Number(id) ? updatedTalker : item)),
    );
    writeTalker(data);
    response.status(HTTP_OK_STATUS).json(updatedTalker);
  }),
);

module.exports = talkerRouter;
