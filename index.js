const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const token = require('./middleware/token');
const emailValid = require('./middleware/validationEmail');
const passwordValid = require('./middleware/validationPassword');
const tokenValid = require('./middleware/validationToken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/talker', async (_request, response) => {
  try {
    const data = await fs.readFile('./talker.json');
    // requisito 1
   return response.status(HTTP_OK_STATUS).json(JSON.parse(data));
  } catch (error) {
    response.status(400).json({ message: `Erro ${error.code}` });
  }
});

// requisito 2

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile('./talker.json');
    const findData = JSON.parse(data);
    const findId = findData.find((e) => e.id === parseInt(id, 10) && [e]);
    if (!findId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 
    return res.status(HTTP_OK_STATUS).json(findId);
  } catch (error) {
    res.status(400).json({ message: `Erro: ${error.code}` });
  }
});

// requisito 3

app.post('/login', emailValid, passwordValid, token);

// requisito 4

app.post('/talker', tokenValid);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
