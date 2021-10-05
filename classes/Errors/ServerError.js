const HttpError = require('./HttpError');

module.exports = class ServerError extends HttpError {
  constructor(message) {
    const finalMessage = message || 'Erro interno no servidor.';
    super({ message: finalMessage, status: 500 });
  }
};
