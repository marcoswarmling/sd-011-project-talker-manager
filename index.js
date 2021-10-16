const express = require('express');
const bodyParser = require('body-parser');

const getTalker = require('./mid/getTalker');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.get('/talker', getTalker);
app.listen(PORT, () => {
  console.log('Online');
});
