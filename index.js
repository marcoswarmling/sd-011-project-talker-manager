import express from 'express';
import { json } from 'body-parser';
import talkerRouter from './routers/talkerRouter';
import loginRouter from './routers/loginRouter';

const app = express();
app.use(json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// evaluator endpoint
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// talker router
app.use('/talker', talkerRouter);

// login router
app.use('/login', loginRouter);

// app
app.listen(PORT, () => {
  console.log('Online');
});
