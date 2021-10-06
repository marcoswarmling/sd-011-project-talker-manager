const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const dados = fs.readFileSync('talker.json', 'utf-8');

  if (!dados) {
   return res.status(200).json([]);
    }

   return res.status(200).send(JSON.parse(dados));
});

app.get('/talker/:id', (req, res) => {
  const dados = fs.readFileSync('talker.json', 'utf-8');
  const newdados = JSON.parse(dados);

  const { id } = req.params;

    const dadosId = newdados.find((i) => Number(i.id) === Number(id));

    if (!dadosId) res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).send(dadosId);
});

app.listen(PORT, () => {
  console.log('Online');
});
