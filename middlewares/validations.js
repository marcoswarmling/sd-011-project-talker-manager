const fs = require('fs').promises;
const crypto = require('crypto');

const jsonFile = './talker.json';

// vvvvvvvvvvvv Middlewares vvvvvvvvvvvv

const getTalkers = async (req, res) => {
  try {
    const response = await fs.readFile(jsonFile, 'utf-8');
    if (!response) {
      return res.status(200).json([]);
    }
    res.status(200).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const response = await fs.readFile(jsonFile, 'utf-8');
    const responseConvert = JSON.parse(response);
    const talker = responseConvert.find(({ id }) => id === parseInt(req.params.id, 10));
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
  } catch (err) {
    res.status(400).json(err);
  }  
};

const getToken = (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};

const postTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const response = await fs.readFile(jsonFile, 'utf-8');
  const responseConvert = JSON.parse(response);
  const dataTalker = {
    name,
    age,
    id: responseConvert.length + 1,
    talk: {
      watchedAt,
      rate,
    },
  };
  responseConvert.push(dataTalker);

  await fs.writeFile(jsonFile, JSON.stringify(responseConvert));
  res.status(201).send(dataTalker);
};

const putTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const response = await fs.readFile(jsonFile, 'utf-8');
  const responseConvert = JSON.parse(response);
  const updateTalker = responseConvert.findIndex((talker) => talker.id === parseInt(id, 10));
  responseConvert[updateTalker] = { ...responseConvert[updateTalker],
    name,
    age,
    talk: { watchedAt, rate } };
  await fs.writeFile(jsonFile, JSON.stringify(responseConvert));
  res.status(200).json(responseConvert[updateTalker]);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(jsonFile, 'utf-8');
  const responseConvert = JSON.parse(response);

  const findTalker = responseConvert.findIndex((talker) => talker.id === parseInt(id, 10));

  responseConvert.splice(findTalker, 1);

  await fs.writeFile(jsonFile, JSON.stringify(responseConvert));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

// vvvvvvvvvvvv Validations vvvvvvvvvvvv

const emailValidation = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
    
  if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
}
    
  if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
}
    
  if (parseInt(age, 10) < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt) {
    return res
      .status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regexDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  
  if (parseInt(talk.rate, 10) < 1 || parseInt(talk.rate, 10) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!talk.rate) {
    return res
      .status(400)
      .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = { 
getTalkers, 
getTalkerById, 
getToken, 
emailValidation, 
passwordValidation,
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation, 
postTalker, 
putTalker,
deleteTalker };