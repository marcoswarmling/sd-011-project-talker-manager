const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const ARQUIVO = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const dados = fs.readFileSync(ARQUIVO, 'utf-8');

  if (!dados) {
   return res.status(200).json([]);
    }

   return res.status(200).send(JSON.parse(dados));
});

app.get('/talker/:id', (req, res) => {
  const dados = fs.readFileSync(ARQUIVO, 'utf-8');
  const newdados = JSON.parse(dados);

  const { id } = req.params;

    const dadosId = newdados.find((i) => Number(i.id) === Number(id));

    if (!dadosId) res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).send(dadosId);
});

function validTokenUser(req, res, next) {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
 return res.status(401)
   .json({ message: 'Token não encontrado' });
}

  if (token.length !== 16) {
 return res.status(401)
  .json({ message: 'Token inválido' });
}
next();
}

function validateEmailRequisitos(email) {
  const re = /\S+@\S+\.com/;
  return re.test(email);
    // Solução de https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
}

function validateData(data) {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return re.test(data);
    // Solução de https://www.regextester.com
}

// middle valida password
function validaPassword(req, res, next) {
  const { password } = req.body;
  console.log(req.body);
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({
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
 return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
}

function validaUserName(req, res, next) {
  const { name } = req.body;
  if (name === '' || name === undefined) {
 return res.status(400)
   .json({ message: 'O campo "name" é obrigatório' });
}

  if (name.length < 3) {
 return res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
}
next();
}

function validAge(req, res, next) {
  const { age } = req.body;
  if (age === '' || age === undefined) {
 return res.status(400)
   .json({ message: 'O campo "idade" é obrigatório' });
}

  if (age.length < 18) {
 return res.status(400)
  .json({ message: 'A pessoa palestrate deve ser maior de idade' });
}
next();
}

function validWat(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const validData = validateData(watchedAt);
  console.log(validData);
  if (!validData) {
 return res.status(400)
   .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}

  if (rate.length < 1 || rate.length > 5) {
 return res.status(400)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
  
  next();
}

function validDataAndRate(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  
  if (rate.length === 0 || watchedAt.length === 0) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
   }
   next();
}

app.post('/login', validaPassword, validaEmail, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.post('/talker',
validTokenUser,
validaUserName,
validAge,
validWat,
validDataAndRate, (req, res) => {
  const { name, age, talk } = req.body;
  const dados = fs.readFileSync(ARQUIVO, 'utf-8');
    const FileAdd = JSON.parse(dados);
    const id = FileAdd.length + 1;
    const newAddDocument = { name, age, id, talk: { ...talk } };
  
  FileAdd.push(newAddDocument);
  fs.writeFileSync(ARQUIVO, JSON.stringify(FileAdd));

    res.status(201).json(newAddDocument);
});

app.put('/talker/:id',
validTokenUser,
validaUserName,
validAge,
validWat,
validDataAndRate, (req, res) => {
   const { id } = req.params;
   const dados = fs.readFileSync(ARQUIVO, 'utf-8');
   const newdados = JSON.parse(dados);

    const dadosId = newdados.findIndex((i) => Number(i.id) === Number(id));
    const { name, age, talk: { watchedAt, rate } } = req.body;
    
    newdados[dadosId] = { ...newdados[dadosId], name, age, talk: { watchedAt, rate } };

    fs.writeFileSync(ARQUIVO, JSON.stringify(newdados));
    res.status(200).json(newdados);
    });

    app.put('/talker/:id',
validTokenUser,
validaUserName,
validAge,
validWat,
validDataAndRate, (req, res) => {
   const { id } = req.params;
   const dados = fs.readFileSync(ARQUIVO, 'utf-8');
   const newdados = JSON.parse(dados);

    const dadosId = newdados.findIndex((i) => Number(i.id) === Number(id));
    
    newdados.splice(dadosId, 1);

    fs.writeFileSync(ARQUIVO, JSON.stringify(newdados));
    res.status(200).json(newdados);
    });

app.listen(PORT, () => {
  console.log('Online');
});