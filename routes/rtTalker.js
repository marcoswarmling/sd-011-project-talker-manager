const express = require('express');
const fs = require('fs');

const { 
    validAge,
    validDate,
    validName,
    validRate,
    validRating,
    validTalk,
    validToken,   
} = require('../middlewares/middlewaresTalker');

const rtTalker = express.Router();
// rest codes:
const HTTP_OK_STATUS = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

rtTalker.post('/',
    validToken,
    validName,
    validAge,
    validTalk,
    validRate,
    validDate,
    validRating,
    (_request, response) => {
        const { name, age, talk } = _request.body;
        const talkerData = fs.readFileSync('../talker.json', 'utf8');
        const talkersJson = JSON.parse(talkerData);
        const putId = talkersJson[talkersJson.length - 1].id + 1;
        const talker = { id: putId, name, age, talk };

        talkersJson.push(talker);
        fs.writeFileSync('./talker.json', JSON.stringify(talkersJson));
        response.status(CREATED).json(talker);
});

rtTalker.get('/search', (_request, response) => { // Falta terminar requisito 7
  const { q } = _request.query;
  const dados = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const dadosFilter = dados.find((e) => e.name === q);
  
  return response.status(HTTP_OK_STATUS).send(dadosFilter);
});
    
rtTalker.get('/:id', (_request, response) => {
  const { id } = _request.params;
  const idNum = Number(id); // id vem como string e será comparada com inteiros   
  try {
    const talkerData = fs.readFileSync('./talker.json', 'utf8');
    const talkersJson = JSON.parse(talkerData);
    const talker = talkersJson.find((e) => e.id === idNum); // so recebe "===" , nao "=="
    if (talker) {
      response.status(HTTP_OK_STATUS).json(talker);
    }
    response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ error });
  }
});
    
rtTalker.get('/', (_request, response) => {
    try {
      const talkerData = fs.readFileSync('./talker.json', 'utf8');
      const talkersJson = JSON.parse(talkerData);
      if (talkersJson === null) {
        return response.status(HTTP_OK_STATUS).json([]);
      }
      return response.status(HTTP_OK_STATUS).json(talkersJson);
    } catch (error) {
      return response.status(INTERNAL_SERVER_ERROR).json({ error });
    }
});

module.exports = rtTalker;
