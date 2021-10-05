const express = require('express');
const { validEmail, validPassword, generatorToken } = require('./validators');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!validEmail(email)) {
 return res.status(400).json({ 
      message: 'O "email" deve ter o formato "email@email.com"',
     }); 
}
    if (!password) {
 return res.status(400).json({ 
      message: 'O campo "password" é obrigatório',
     }); 
}
    if (!validPassword(password)) {
 return res.status(400).json({ 
      message: 'O "password" deve ter pelo menos 6 caracteres',
     }); 
}
    return res.status(200).json({ token: generatorToken(email, password) });
});

module.exports = router;
