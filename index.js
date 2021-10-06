const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { talkersList, writeNewTalker } = require('./challenges/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// ! =============================== Inicio Desafios ===================================

// ? ================================= Desafio 1 =======================================

app.get('/talker', (_req, res) => {
  const talker = talkersList();
  res.status(200).json(talker);
});

// ? ================================= Desafio 2 =======================================

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = talkersList();

  const chooseTalker = talker.find((e) => e.id === Number(id));

  if (!chooseTalker) {
    return res.status(404)
    .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(chooseTalker);
});

// ? ================================= Desafio 3 =======================================

const { validateEmail } = require('./middleware/login/validateEmail');
const { validatePassword } = require('./middleware/login/validatePassword');

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

// ? ================================= Desafio 4 = ======================================

const { validateToken } = require('./middleware/talker/validateToken');
const { validateName } = require('./middleware/talker/validateName');
const { validateAge } = require('./middleware/talker/validateAge');
const { validateTalk } = require('./middleware/talker/validateTalk');
const { validateWatchedAt } = require('./middleware/talker/validateWatchedAt');
const { validateRate } = require('./middleware/talker/validateRate');

app.post('/talker',
  validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate,
  (req, res) => {
    const { name, age, talk } = req.body;
    const listOfTalkers = talkersList();
    // const talkersId = Object.keys(listOfTalkers);

    const newTalker = {
      name,
      age,
      id: 5,
      talk,
    };

    listOfTalkers.push(newTalker);

    // console.log(JSON.stringify(listOfTalkers));

    writeNewTalker(JSON.stringify(listOfTalkers));

    res.status(201).json(newTalker);
  });

// ! ================================= Fim Desafios ====================================

app.listen(PORT, () => {
  console.log('Online');
});
