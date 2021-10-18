const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const fs = require('fs');

const { verifyEmail, verifyPassword } = require('./middleware/loginValidation');
const { validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
} = require('./middleware/talkerValidation');

const app = express();
app.use(bodyParser.json());

const talkers = './talker.json';

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_ERROR_STATUS = 500;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  try {
    const data = fs.readFileSync(talkers, 'utf8');
    const talker = JSON.parse(data);
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    return response.status(HTTP_ERROR_STATUS).json(error);
  }
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  try {
    const data = fs.readFileSync(talkers, 'utf8');
    const talker = JSON.parse(data);
    const getTalkerById = talker.find((r) => r.id === parseInt(id, 10));

    if (!getTalkerById) {
      return response
        .status(HTTP_NOT_FOUND_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS).json(getTalkerById);
  } catch (error) {
    return response.status(HTTP_ERROR_STATUS).json(error);
  }
});

app.post('/login', verifyEmail, verifyPassword, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken,
validateName,
validateAge,
validateTalk,
validateTalkWatchedAt,
validateTalkRate,
(request, response) => {
  const { name, age, talk } = request.body;
  const data = fs.readFileSync(talkers, 'utf8');
  const talker = JSON.parse(data);

  const id = talker.length + 1;

  const newTalker = {
    name,
    age,
    id,
    talk,
  };

  talker.push(newTalker);

  fs.writeFileSync(talkers, JSON.stringify(talker));

  response.status(HTTP_CREATED_STATUS).json(newTalker);
});

app.put('/talker/:id', validateToken,
validateName,
validateAge,
validateTalk,
validateTalkWatchedAt,
validateTalkRate,
(request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;

  const data = fs.readFileSync(talkers, 'utf8');
  const talker = JSON.parse(data);
  const talkerIndex = talker.findIndex((t) => t.id === parseInt(id, 10));
  talker[talkerIndex] = { ...talker[talkerIndex], name, age, talk };

  fs.writeFileSync(talkers, JSON.stringify(talker));
  const editedTalker = talker.find((t) => t.id === parseInt(id, 10));
  response.status(HTTP_OK_STATUS).json(editedTalker);
});

app.delete('/talker/:id', validateToken, (request, response) => {
  const { id } = request.params;

  const data = fs.readFileSync(talkers, 'utf8');
  const talker = JSON.parse(data);
  const talkerIndex = talker.findIndex((t) => t.id === parseInt(id, 10));
  
  const editedList = talker.slice(talkerIndex, 1);

  fs.writeFileSync(talkers, JSON.stringify(editedList));
  response.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
