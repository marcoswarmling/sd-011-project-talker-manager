const express = require('express');
const genToken = require('../utils/genToken');
const authLogin = require('../auth/authLogin');

const login = express.Router();

login.post('/', authLogin, (_req, res) => res.status(200).json({ token: genToken(16) }));

module.exports = login;
