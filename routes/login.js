const router = require('express').Router();
// const fs = require('fs').promises;
// const crypto = require('crypto');

// const writeTalker = (newFile) => fs.writeFile('./talker.json', JSON.stringify(newFile));

// const generateToken = (req, res) => {
//   const token = crypto.randomBytes(8).toString('hex');
//   return res.status(200).json({ token });
// };

const emailOk = (req, res) => {
  const email = req;
  const valid = /\S+@\S+\.\S+/; // -> https://www.horadecodar.com.br

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }  
  if (!valid.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const passwordOk = (req, res) => {
  const password = req;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

router.post('/', async (req, res) => {
  passwordOk();
  emailOk();
  // const user = {
  //   email: req.body.email,
  //   password: req.body.password,
  // };
  // emailOk(user.email, res);
  // passwordOk(user.password, res);
  // const db = await fs.readFile('./talker.json', 'utf8')
  // .then((data) => JSON.parse(data));
  // db.push(user);
  // await writeTalker(db);
  res.status(201).json();
});

module.exports = router;