const express = require('express');

const app = express();
app.use(express.json());

function validCredencies(req, res, next) {
  const { email, password } = req.body;
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
}

module.exports = app.post('/login', validCredencies, (_req, res) =>
  res.status(200).json({
    message: '7mqaVRXJSp886CGr',
  }));
