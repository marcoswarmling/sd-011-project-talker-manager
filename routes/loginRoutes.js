const express = require('express');

const router = express.Router();

const {
  getLoginToken,
  authEmail,
  authPassword,
} = require('../middlewares/loginMiddlewares');

router.post('/', authEmail, authPassword, getLoginToken);

module.exports = router;