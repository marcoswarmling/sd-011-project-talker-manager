const express = require('express');
const bodyParser = require('body-parser');

const talkersRoutes = require('./routes/talkerRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const routee = require('./routes/validarRoutes');
const validePutRoutes = require('./routes/validePutRoutes');
const deleteRoutes = require('./routes/deleteRoutes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkersRoutes);

app.use('/login', loginRoutes);

app.use('/talker', routee);

app.use('/talker', validePutRoutes);

app.use('/talker', deleteRoutes);

app.listen(PORT, () => {
  console.log('Online');
});