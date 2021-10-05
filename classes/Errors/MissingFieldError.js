const HttpError = require('./HttpError');

module.exports = class MissingFieldError extends HttpError {
  constructor(field) {
    const message = `O campo "${field}" é obrigatório`;
    super({ message, status: 400 });
  }
};
