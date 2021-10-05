const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');// trabalhar assincronicidade no Express
const talkerUtils = require('./fs-utils');
const {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalkRate,
  isValidTalk,
  isValidTalkWatchedAt,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// npm test getAllTalkers.test.js
// npm test getTalkerById.test.js
// npm test login.test.js
// npm test createTalker.test.js
// npm test editTalker.test.js
// npm test deleteTalker.test.js
// npm test searchTalker.test.js

// Requisito 7
app.get(
  '/talker/search',
  isValidToken,
  rescue(async (req, res) => {
    const searchTerm = req.query.q;
    const talker = await talkerUtils.getTalker();
    
    if (!searchTerm || searchTerm === '') return res.status(200).json(talker);
    
    const filteredTalkers = talker.filter((element) => element.name.includes(searchTerm));

    res.status(200).json(filteredTalkers);
  }),
);

// Requisito 2
// http GET :3000/talker/1
// http GET :3000/talker/100
app.get('/talker/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talker = await talkerUtils.getTalker();
  const talkerId = talker.find((element) => element.id === parseInt(id, 10));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 

  res.status(200).json(talkerId);
}));

// Requisito 1
// http GET :3000/talker 
app.get('/talker', rescue(async (req, res) => {
  const talker = await talkerUtils.getTalker();
  res.status(200).json(talker);
}));

// Requisito 3
// http POST :3000/login email="email@email.com" password="123456"
// http POST :3000/login email="" password="123456"
// http POST :3000/login password="123456"
// http POST :3000/login email="v@" password="123456"
// http POST :3000/login email="email@email.com" password=""
// http POST :3000/login email="email@email.com"
// http POST :3000/login email="email@email.com" password="123"
app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

// Requisito 4
// Como passar um objeto pelo body?
// http POST :3000/talker name="abc" age:=56 Authorization:"7mqaVRXJSp886CGr"
// http POST :3000/talker name="abc" Authorization:"7mqaVRXJSp886CGr"
// http POST :3000/talker name="Danielle Santos" age:=56 talk:{ rate: 2, watchedAt: '25/09/2020' } Authorization:"7mqaVRXJSp886CGr"
/*
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
*/
app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidTalkRate,
  isValidTalkWatchedAt,
  rescue(async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = await talkerUtils.getTalker();
    const newTalker = {
      id: talker.length + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    const newTalkers = [...talker, newTalker];
  
    await talkerUtils.setTalker(newTalkers);

    res.status(201).json(newTalker);
  }),
);

app.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidTalkRate,
  isValidTalkWatchedAt,
  rescue(async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const { id } = req.params;
    const talker = await talkerUtils.getTalker();
    const talkerToUpdateIndex = talker.findIndex((element) => element.id === parseInt(id, 10));
    const talkerUpdated = {
      id: parseInt(id, 10),
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    const newTalkers = [...talker];
    newTalkers[talkerToUpdateIndex] = talkerUpdated;
    await talkerUtils.setTalker(newTalkers);
    res.status(200).json(talkerUpdated);
  }),
);

app.delete(
  '/talker/:id',
  isValidToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const talker = await talkerUtils.getTalker();
    
    const newTalkers = talker.filter((element) => element.id !== parseInt(id, 10));

    await talkerUtils.setTalker(newTalkers);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }),
);

app.listen(PORT, () => {
  console.log('Online');
});
