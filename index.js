const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// evaluator endpoint
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// talker router
const talkerRt = require('./routers/talkerRouter.js');

app.use('/talker', talkerRt);

// login router
const loginRt = require('./routers/loginRouter.js');

app.use('/login', loginRt);

// app
app.listen(PORT, () => {
  console.log('Online');
});
