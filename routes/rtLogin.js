const express = require('express');
const { 
    emailChk,
    passChk,
    mkToken } = require('../middlewares/middlewaresLogin');

const rtLogin = express.Router();

// rest codes:
const HTTP_OK_STATUS = 200;
// const INTERNAL_SERVER_ERROR = 500;
// const NOT_FOUND = 404;

rtLogin.post('/', emailChk, passChk, (request, response) => {
    const token = mkToken(16);
    response.status(HTTP_OK_STATUS).json({ token });    
});

// rtLogin.get('/', (_request, response) => {
//     response.status(200).json({ token: mkToken(16) });    
// });

module.exports = rtLogin;
