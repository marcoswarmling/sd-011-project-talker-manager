import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// talker router
const talkerRouter = require('./routers/talkerRouter');

app.use('/talker', talkerRouter);

// login router
const loginRouter = require('./routers/loginRouter');

app.use('/login', loginRouter);

// app
app.listen(PORT, () => {
  console.log('Online');
});
