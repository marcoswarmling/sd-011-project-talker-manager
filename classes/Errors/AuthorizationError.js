const HttpError = require('./HttpError');

module.exports = class AuthorizationError extends HttpError {
  constructor(message) {
    super({ message, status: 401 });
  }
};
