const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/talker.js');
const middleWares = require('./middleWares/index');
const functionsLogin = require('./functionsLogin/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(router);

app.post('./login', middleWares.login, (_req, res) => {
  res.status(200).json({
    token: `${functionsLogin.getToken()}`,
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
