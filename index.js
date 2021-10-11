const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./middlewares/controllers');
const { 
  validEmail,
  validPassword,
  validToken,
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.get(
  '/talker/search',
  validToken,
  controllers.search,
);
app.post('/login', validEmail, validPassword);
app.post(
  '/talker',
   validToken,
   validName,
   validAge,
   validTalk,
   validWatchedAt,
   validRate,
   controllers.create,
);
app.get('/talker', controllers.getAll);
app.get('/talker/:id', controllers.getById);
app.put(
  '/talker/:id',
  validToken,
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
  controllers.update,
);
app.delete(
  '/talker/:id',
  validToken,
  controllers.deleta,
);
app.listen(PORT, () => {
  console.log('Online');
});
