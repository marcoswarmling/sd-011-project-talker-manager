const fs = require('fs').promises;

const readFile = async (_req, res) => {
  try {
    const response = await fs.readFile('./talker.json', 'utf-8');

    return JSON.parse(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkers = async (_req, res) => {
  try {
    const response = await readFile();
    if (!response) {
      return res.status(200).json([]);
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerId = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await readFile();
    const talker = response.find((result) => result.id === Number(id));
    
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
  } catch (err) {
    res.status(400).json(err);
  } 
};

const setValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const setValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const createToken = (_req, res) => {
  const newToken = '1234567abdertygh';
  
  return res.status(200).json({ token: `${newToken}` });
};

const generateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const setValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const setValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const setValidTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || !talk.watchedAt) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
   });
  }

  next();
};

const regexForWatched = (req, res, next) => {
  const { talk } = req.body;

  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!regex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const setValidLength = (req, res, next) => {
  const { talk } = req.body;

  if (parseInt(talk.rate, 10) > 5 || parseInt(talk.rate, 10) < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!talk.rate) {
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const postPalestrante = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const result = await readFile();
  
  const id = result.length + 1;

  const talker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await fs.writeFile('./talker.json', JSON.stringify([...result, talker]));
  res.status(201).json(talker);
};

const findPalestrantAndModify = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const updatePalestrant = {
    id: Number(req.params.id),
    name,
    age,
    talk: {
      watchedAt, rate,
    },
  };

  const response = await readFile();

  const talker = response.findIndex(({ id }) => id === Number(req.params.id));

  response[talker] = updatePalestrant; 
  await fs.writeFile('./talker.json', JSON.stringify(response));
  res.status(200).json(updatePalestrant);
};

const deletePalestrant = async (req, res) => {
  const { id } = req.params;

  const result = await readFile();
  
  const findPalestrant = result.findIndex((response) => response.id === Number(id));
  
  result.splice(findPalestrant, 1);

  await fs.writeFile('./talker.json', JSON.stringify(result));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = {
  getTalkers,
  getTalkerId,
  setValidPassword,
  setValidEmail,
  createToken,
  generateToken,
  setValidAge,
  setValidName,
  setValidTalk,
  setValidLength,
  regexForWatched,
  postPalestrante,
  findPalestrantAndModify,
  deletePalestrant,
};
