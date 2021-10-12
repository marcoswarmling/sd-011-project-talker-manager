const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');

const getAll = require('./middlewares/talker/getAll');
const getID = require('./middlewares/talker/getID');
const login = require('./middlewares/login/makeLogin');
const addNewPerson = require('./middlewares/talker/addNewPerson');
const attPerson = require('./middlewares/talker/attPerson');
const deletePerson = require('./middlewares/talker/deletePerson');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.delete('/talker/:id', deletePerson);

app.put('/talker/:id', attPerson);

app.post('/login', login);

app.post('/talker', addNewPerson);

app.get('/talker', getAll);

app.get('/talker/:id', getID);

app.use(({ status, message }, _req, res, _next) => res.status(status).json({ message }));

app.listen(PORT, () => {
  console.log('Online');
});
