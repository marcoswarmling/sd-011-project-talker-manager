const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Porta disponivel');
});

const paths = {
  talker: './talker.json',
  tokens: './tokens.json',

};

const { FileRead, FileWrite } = require('./services/FilesHandler');
const { findId, updateContentById, deleteContentById } = require('./services/SearchById');
const {
  handleSignupInfo,
  emailValidator,
  passwordValidator,
  handleRegistration,
} = require('./services/LoginHandler');
const authenticationMiddleware = require('./middlewares/authenticationMiddleware.js');
const searchMiddleware = require('./middlewares/searchMiddleware.js');

app.get('/talker', async (_request, response) => {
  const contentFromFile = await FileRead(paths.talker);
  if (contentFromFile) return response.status(HTTP_OK_STATUS).json(contentFromFile);
  return response.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkersDatabase = await FileRead(paths.talker);
  const findedTalker = findId(talkersDatabase, id);
  const errorMessage = { message: 'Pessoa palestrante não encontrada' };
  if (findedTalker) {
    return response.status(HTTP_OK_STATUS).json(findedTalker);
  }
  return response.status(HTTP_NOT_FOUND_STATUS).json(errorMessage);
});

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  const validateEmail = emailValidator(email);
  const validatePassword = passwordValidator(password);
  if (validateEmail !== true) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validateEmail });
  }
  if (validatePassword !== true) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatePassword });
  }
  
  const getToken = handleSignupInfo(email, password);
  return response.status(HTTP_OK_STATUS).json({ token: getToken.token });
});

app.use(authenticationMiddleware);

app.post('/talker', async (request, response) => {
  const { name, age, talk } = request.body;
  const currentFileContent = await FileRead(paths.talker);
  const id = currentFileContent.length + 1;
  const validatedTalkerData = handleRegistration(name, age, talk, id);
  if (typeof validatedTalkerData === 'string') {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatedTalkerData });
  }
  currentFileContent.push(validatedTalkerData);
  await FileWrite(paths.talker, currentFileContent);
  return response.status(HTTP_CREATED_STATUS).json(validatedTalkerData);
});

app.put('/talker/:id', async (request, response) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;
  const validatedTalkerData = handleRegistration(name, age, talk, id);
  if (typeof validatedTalkerData === 'string') {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatedTalkerData });
  }
  const currentFileContent = await FileRead(paths.talker);
  const newContent = updateContentById(currentFileContent, id);
  const updatedTalker = { name, age: Number(age), id: Number(id), talk };
  newContent.push(updatedTalker);
  await FileWrite(paths.talker, newContent);
  return response.status(HTTP_OK_STATUS).json(updatedTalker);
});

app.delete('/talker/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const currentFileContent = await FileRead(paths.talker);
    const deletionResults = deleteContentById(currentFileContent, id);
    const newContent = deletionResults.content;
    const successMessage = deletionResults.message;

    await FileWrite(paths.talker, newContent);

    return response.status(HTTP_OK_STATUS).json({ message: successMessage });
  } catch ({ message }) {
    console.error(`Erro: ${message}`);
  }
});

app.get('/talker/search', authenticationMiddleware, searchMiddleware);
