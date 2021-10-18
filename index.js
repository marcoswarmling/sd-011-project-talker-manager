// importa o express
const express = require('express');

// importa a minha rota
const talks = require('./routes/talks');

// instancia o express
const app = express();

app.use(express.json());

// referencia a porta
const port = '3000';

// usando a rota
app.use('/talks', talks);

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar

// rota padrão
app.get('/', (req, res) => {
  res.status(HTTP_OK_STATUS).json({ message: 'Olá Mundo' });
});

app.listen(port, () => {
  console.log(`Online ${port}`);
});
