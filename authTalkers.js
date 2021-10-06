const crypto = require('crypto');
const fs = require('fs').promises;

const userToken = crypto.randomBytes(8).toString('hex');

const TokenCreation = async (_req, res) => {
  try {
    await res.status(200).send({ token: userToken });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

const getAllTalkers = async (_req, res) => {
  try {
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    if (!talkers) res.status(200).json([]);
    res.status(200).json(JSON.parse(talkers));
  } catch (err) {
    res.status(400).json(err);
  }
};

const IDVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    const result = JSON.parse(talkers);
    const talkerIncluded = result.find((talker) => talker.id === Number(id));
    if (!talkerIncluded) { 
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talkerIncluded);
  } catch (err) {
    res.status(400).json(err);
  }
};

const PasswordVerification = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const EmailVerification = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!(email.includes('.com') && email.includes('@'))) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

// const TokenVerification = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ 
//       message: 'Token não encontrado',
//     });
//   }

//   if (authorization.length !== 16) {
//     return res.status(401).json({
//       message: 'Token inválido',
//     }); 
//   }
//   next();
// };

// const nameVerify = (req, res, next) => {
//   const { name } = req.body;
//   if (!name) {
//     return res.status(400).send({ message: 'O campo "name" é obrigatório' });
//   }
//   if (name && name.length < 3) {
//     res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
//   }
//   next();
// };

// const AgeVerify = (req, res, next) => {
//   const { age } = req.body;
//   if (!age) {
//     res.status(400).send({ message: 'O campo "age" é obrigatório' });
//   }
//   if (age < 18) {
//     res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
//   }
//   next();
// };

// const validTalk = (req, res, next) => {
//   const { talk } = req.body;

//   if (!talk || !talk.watchedAt) {
//     return res.status(400).send({
//       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
//     });
//   }

//   next();
// };

// const watchedAtVerification = (req, res, next) => {
//   const { talk } = req.body;
//   const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
//   if (!talk || !talk.watchedAt) {
//     res.status(400).json({
//        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
//     });
//   }
//   if (!dateRegex.test(talk.watchedAt)) {
//     res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
//   }
//   next();
// };

// const ratedVerification = (req, res, next) => {
//   const { talk } = req.body;
//   if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
//     res.status(400).json({ 
//       message: 'O campo "rate" deve ser um inteiro de 1 à 5',
//     });
//   }
//   if (!talk.rate) {
//     return res.status(400).send({
//       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
//     });
//   }
//   next();
// };

// const talkerSetter = async (req, res) => {
//   const { name, age, talk: { rate, watchedAt } } = req.body;

//   const talker = await fs.readFile('./talker.json', 'utf-8');
//   const result = JSON.parse(talker);
//   const newTalker = {
//     name,
//     age,
//     id: result.length + 1,
//     talk: {
//       rate,
//       watchedAt,
//     },
//   };
//   result.push(newTalker);
//   await fs.writeFile('./talker.json', JSON.stringify(result));
//   res.status(201).send(newTalker);
// };

module.exports = {
  // AgeVerify,
  // nameVerify,
  // validTalk,
  // talkerSetter,
  getAllTalkers,
  TokenCreation,
  IDVerification,
  EmailVerification,
  // TokenVerification,
  // ratedVerification,
  PasswordVerification,
  // watchedAtVerification,
};