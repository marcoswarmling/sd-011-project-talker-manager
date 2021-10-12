const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());
// faz a app entender que irei usar o router do login e do talk (req. 3 e 4 respec.):
// TROCAR URLS
// app.use('/login', loginRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Função de leitura - inicialmente no arquivo fsUtils.
function getTalkers() {
  // lendo arquivo:
  return fs.readFile('./talker.json', 'utf-8')
  // 'traduzindo' para json
  .then((talkerContent) => JSON.parse(talkerContent));
}

// Requisito 1:
app.get('/talker', rescue(async (_request, response) => {
  const talker = await getTalkers();
  response.status(200).json(talker);
}));

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 2:
app.get(
      '/talker/:id',
      rescue(async (req, res) => {
        const { id } = req.params;
        const talker = await getTalkers();
        // quando findIndex não encontra o elemento, ele retorna -1:
        const talkerId = talker.findIndex((p) => p.id === Number(id));
        
        if (talkerId === -1) {
          return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
      return res.status(200).json(talker[talkerId]);
       }),
    );