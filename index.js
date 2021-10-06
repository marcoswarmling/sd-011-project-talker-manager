const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

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

// const validatedToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token !== '7mqaVRXJSp886CGr') {
//     return res.status(400).json({ message: 'Você não está autorizado!' });
//   }
//   next();
// };

function validateEmailRequisitos(email) {
  const re = /\S+@\S+\.com/;
  return re.test(email);
    // Solução de https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
}

// middle valida password
function validaPassword(req, res, next) {
  const { password } = req.body;
  console.log(req.body);
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function validaEmail(req, res, next) {
  const { email } = req.body;
  const consultaEmail = validateEmailRequisitos(email);
  if (!email || email.length === 0) {
 return res.status(400)
   .json({ message: 'O campo "email" é obrigatório' });
}

  if (!consultaEmail) {
 res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
}

app.post('/login', validaPassword, validaEmail, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

// criptoks

app.listen(PORT, () => {
  console.log('Online');
});