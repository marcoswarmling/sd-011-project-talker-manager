const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./routes/talker');

const app = express();
app.use(bodyParser.json());

app.use('/talker', talker);

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// Linha 4: Unable to resolve path to module './routes/talker'.