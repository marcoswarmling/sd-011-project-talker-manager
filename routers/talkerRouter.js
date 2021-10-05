const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;
const validateDate = require('validate-date');

const talkerRouter = express();
talkerRouter.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;

const errorMessages = {
  talkerNotFound: { message: 'Pessoa palestrante não encontrada' },
  tokenNotFound: { message: 'Token não encontrado' },
  invalidToken: { message: 'Token inválido' },
  nameNotFound: { message: 'O campo "name" é obrigatório' },
  nameWrong: { message: 'O "name" deve ter pelo menos 3 caracteres' },
  ageNotFound: { message: 'O campo "age" é obrigatório' },
  ageWrong: { message: 'A pessoa palestrante deve ser maior de idade' },
  wrongTalk: {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  },
  wrongWatchedAt: { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
  wrongRate: { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
};

talkerRouter.get('/', rescue(async (_request, response) => {
  const file = await fs.readFile('./talker.json', 'utf8');
  if (!file) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).json(JSON.parse(file));
}));

talkerRouter.post(
  '/',
  rescue((request, response, next) => {
    const { authorization: token } = request.headers;
    const { tokenNotFound, invalidToken } = errorMessages;
    if (!token) return response.status(HTTP_UNAUTHORIZED_STATUS).json(tokenNotFound);
    if (token.length !== 16) return response.status(HTTP_UNAUTHORIZED_STATUS).json(invalidToken);
    next();
  }),
  rescue((request, response, next) => {
    const { name } = request.body;
    const { nameNotFound, nameWrong } = errorMessages;
    if (!name) return response.status(HTTP_BAD_REQUEST_STATUS).json(nameNotFound);
    if (name.length < 3) return response.status(HTTP_BAD_REQUEST_STATUS).json(nameWrong);
    next();
  }),
  rescue((request, response, next) => {
    const { age } = request.body;
    const { ageNotFound, ageWrong } = errorMessages;
    if (!age) return response.status(HTTP_BAD_REQUEST_STATUS).json(ageNotFound);
    if (age < 18) return response.status(HTTP_BAD_REQUEST_STATUS).json(ageWrong);
    next();
  }),
  rescue((request, response, next) => {
    const { talk } = request.body;
    const { wrongTalk } = errorMessages;
    if (!talk || !talk.watchedAt || !talk.rate) {
      return response.status(HTTP_BAD_REQUEST_STATUS).json(wrongTalk);
    }
    next();
  }),
  rescue((request, response, next) => {
    const { talk: { watchedAt, rate } } = request.body;
    const { wrongWatchedAt, wrongRate } = errorMessages;
    if (validateDate(watchedAt, 'dd/mm/yyyy') === 'Invalid Format') {
      return response.status(HTTP_BAD_REQUEST_STATUS).json(wrongWatchedAt);
    }
    if (rate % 1 !== 0 || rate > 5 || rate < 1) {
      return response.status(HTTP_BAD_REQUEST_STATUS).json(wrongRate);
    }
    next();
  }),
  rescue(async (request, response) => {
    const file = await fs.readFile('./talker.json', 'utf8');
    let data = JSON.parse(file);
    const newTalker = { ...request.body, id: data.length + 1 };
    data = JSON.stringify([...data, newTalker]);
    fs.writeFile('./talker.json', data, 'utf-8', (error) => {
      if (error) throw error;
    });
    response.status(HTTP_CREATED_STATUS).json(newTalker);
  }),
);

talkerRouter.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const { talkerNotFound } = errorMessages;
  const file = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(file).find((item) => item.id === Number(id));
  if (!talker) return response.status(HTTP_NOT_FOUND_STATUS).json(talkerNotFound);
  response.status(HTTP_OK_STATUS).json(talker);
}));

module.exports = talkerRouter;
