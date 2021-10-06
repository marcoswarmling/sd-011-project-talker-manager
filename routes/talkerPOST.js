const express = require('express');
const fs = require('fs').promises;

const app = express();

app.use(express.json());

function validToken(req, res, next) {
  const { token } = req.headers;
  if (token === undefined) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

function validName(req, res, next) {
  const { name } = req.body;
  if (name === '' || name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validAge(req, res, next) {
  const { age } = req.body;
  if (age === '' || age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validTalke(req, res, next) {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  // https://www.regextester.com/99555
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function validObjTake(req, res, next) {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  if (watchedAt === undefined || watchedAt === '' || rate === undefined || rate === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

module.exports = app.post('/talker',
  validToken, validName, validAge,
  validTalke, validObjTake, async (req, res) => {
    const readFile = await fs.readFile('./talker.json').catch(() =>
      res.status(200).json([]));
    const parseJson = JSON.parse(readFile);

    parseJson.push({
      name: 'Danielle Santos',
      age: 56,
      id: parseJson.length + 1,
      talk: {
        watchedAt: '22/10/2019',
        rate: 5,
      },
    });
    fs.writeFile('./talker.json', JSON.stringify(parseJson));
  });
