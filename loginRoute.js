/* O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres que deverá ser utilizado nas demais requisições.
O endpoint deverá retornar um código de status 200 com o token gerado
O campo email deverá ser um email válido. Ele é obrigatório.
O campo password deverá ter pelo menos 6 caracteres.
 */
const express = require('express');

const router = express.Router();
const { createToken, validateEmail, validatePassword } = require('./utils');

router.use(createToken);

router.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
