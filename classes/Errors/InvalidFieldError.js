const HttpError = require('./HttpError');

module.exports = class InvalidFieldError extends HttpError {
  constructor(message) {
    super({ message, status: 400 });
  }
};
