const express = require('express');
const bodyParser = require('body-parser');

const talker = [
  {
    name: 'Henrique Albuquerque',
    age: 62,
    id: 1,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Heloísa Albuquerque',
    age: 67,
    id: 2,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Ricardo Xavier Filho',
    age: 33,
    id: 3,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Marcos Costa',
    age: 24,
    id: 4,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
];

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Crie o endpoint GET /talker
app.get('/talker', (_request, response) => {
  if (talker) {
    response.status(HTTP_OK_STATUS).send(talker);
  } else {
    response.status(HTTP_OK_STATUS).send([]);
  }
});

// Crie o endpoint GET /talker/:id
app.get('/talker/:id', (req, response) => {
  const { id } = req.params;
  const people = talker.find((p) => p.id === Number(id));
  if (people) {
    response.status(HTTP_OK_STATUS).send(people);
  } else {
    response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
});

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!email) {
    res.status(404).send({
      message: 'O campo \'email\' é obrigatório',
    });
  }
  if (!reg.test(email)) {
    console.log(reg.test(email));
    res.status(400).send({ 
      message: 'O \'email\' deve ter o formato \'email@email.com\'',
  });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).send({ 
      message: 'O campo \'password\' é obrigatório',
  });
  }
  if (password.length < 6) {
    res.status(400).send({ 
      message: 'O \'password\' deve ter pelo menos 6 caracteres',
  });
  }
  next();
};

// Crie o endpoint GET /login
app.post('/login', validateEmail, validatePassword, (_req, response) => {
    response.status(HTTP_OK_STATUS).send({
      token: '7mqaVRXJSp886CGr',
    });
});

app.listen(PORT, () => {
  console.log('Online');
});
