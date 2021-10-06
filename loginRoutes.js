const express = require('express');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('./validacoes');

const router = express.Router();
// const fs = require('fs');

const app = express();

app.use(express.json());

router.post('/', validateEmail, validatePassword, (req, res) => {  
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).send({ token });
});

module.exports = router;