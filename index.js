// const express = require('express');
// const loginRouter = require('./routers/loginRouter');
// const talkerRouter = require('./routers/talkerRouter');

// const app = express();
// app.use(express.json());

// const HTTP_OK_STATUS = 200;
// const HTTP_INTERNAL_SERVER_ERROR = 500;
// const PORT = '3000';

// // não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).send();
// });

// app.use('/login', loginRouter);

// app.use('/talker', talkerRouter);

// app.use((error, _request, response, _next) => {
//   response.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: `Erro: ${error.message}` });
// });

// app.listen(PORT, () => {
//   console.log('Online');
// });
