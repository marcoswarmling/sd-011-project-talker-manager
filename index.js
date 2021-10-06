const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userRouter = require('./routers/useRouter');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log('Online');
});

// const result = moment(watchedAt, 'DD/MM/YYYY', true).isValid(); 