const express = require('express');
const bodyParser = require('body-parser');

// References
//
// util:
// https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util
// https://github.com/nodejs/node/blob/v16.9.0/lib/util.js
//
// fs:
// https://nodejs.dev/learn/the-nodejs-fs-module

const util = require('util');
const fs = require('fs');

const file = util.promisify(fs.file);

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// task 1
app.get('/talker', async (_request, response) => {
  file('./talker.json', 'utf8').then((data) => {
    response.status('200').json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
