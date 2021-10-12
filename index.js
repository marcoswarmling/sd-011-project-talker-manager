const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1
app.get('/talker', (_req, res) => {
  try {
    const fileContent = fs.readFileSync('./talker.json', 'utf8');
    const talkers = JSON.parse(fileContent);
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// requisito 2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  try {
    const fileContent = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const data = fileContent.find((t) => t.id === Number(id));
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// requisito 3
app.use('/login', loginRoute);

// requisito 4
app.use('/talker', userRoute);

app.listen(PORT, () => {
  console.log('Online');
});
