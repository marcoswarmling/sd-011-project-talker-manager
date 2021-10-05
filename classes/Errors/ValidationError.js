const HttpError = require('./HttpError');

module.exports = class ValidationError extends HttpError {
  constructor(errors) {
    const errorMessage = errors[0].message;
    let message = '';

    if (errorMessage.startsWith('missing')) {
      const [, field] = errorMessage.split(' ');
      message = `O campo "${field}" é obrigatório`;
    } else {
      message = errorMessage;
    }

    super({ message, status: 400 });
  }
};
