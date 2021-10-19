const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkerRoutes = require('./Routes/talkerRoutes');
const { validateEmail, validatePassword } = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', talkerRoutes);

app.post('/login', validateEmail, validatePassword, (req, res) => {
  // o uso do Crypto o colega Tulio Sploradori me passou em conversa
  // pull request: https://github.com/tryber/sd-011-project-talker-manager/compare/master...Tulio-project-talker
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
