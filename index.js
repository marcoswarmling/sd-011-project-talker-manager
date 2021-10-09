const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const middlewares = require('./middlewares');
const token = require('./token.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const readFile = async () => {
  const fileContent = await fs.readFile('./talker.json', 'utf8');
  const palestrantes = JSON.parse(fileContent);
  return palestrantes;
};

app.get('/talker', async (req, res) => {
  try {
    const file = await readFile();
    return res.status(200).json(file);
  } catch (error) {
    return res.status(500).json({ message: 'Erro na leitura do arquivo!' });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = await readFile();
  const findById = file.find((person) => person.id === Number(id));

  if (!findById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findById);
});

app.post('/login', middlewares.validateEmail, middlewares.validatePassword, (req, res) => {
  const getToken = token();
  res.status(200).json({ token: getToken });
});

app.post('/talker',
  middlewares.validateToken,
  middlewares.validateName,
  middlewares.validateAge,
  middlewares.validateTalk,
  middlewares.validateTalkAttributes,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const file = await readFile();
    const id = file.length + 1;
    const newTalker = {
      id,
      name,
      age,
      talk,
    };

    file.push(newTalker);

    await fs.writeFile('./talker.json', JSON.stringify(file));

    res.status(201).json(newTalker);
  });

app.put('/talker/:id',
  middlewares.validateToken,
  middlewares.validateName,
  middlewares.validateAge,
  middlewares.validateTalk,
  middlewares.validateTalkAttributes,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const file = await readFile();
    const talkerIndex = file.findIndex((item) => item.id === Number(id));
    file[talkerIndex] = { ...file[talkerIndex], name, age, talk };
    await fs.writeFile('./talker.json', JSON.stringify(file));
    res.status(200).json(file[talkerIndex]);
  });

app.delete('/talker/:id',
  middlewares.validateToken, async (req, res) => {
    const { id } = req.params;
    const file = await readFile();
    const talkerIndex = file.findIndex((item) => item.id === Number(id));
    file.splice(talkerIndex, 1);
    await fs.writeFile('./talker.json', JSON.stringify(file));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

app.listen(PORT, () => {
  console.log('Online');
});