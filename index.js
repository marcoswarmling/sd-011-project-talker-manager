const express = require('express');
const bodyParser = require('body-parser');

const rtTalker = require('./routes/rtTalker.js');
const rtLogin = require('./routes/rtLogin.js');

// rest codes:
const HTTP_OK_STATUS = 200;
// const INTERNAL_SERVER_ERROR = 500;
// const NOT_FOUND = 404;

const app = express();

app.use(bodyParser.json());

// rota inicial: //
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send({});
});

// rotas: //
app.use('/talker', rtTalker);
app.use('/login', rtLogin);

// porta de esculta: //
const PORT = '3000';
app.listen(PORT, () => {
  console.log('Online');
});
