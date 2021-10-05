const HttpError = require('./HttpError');

module.exports = class NotFoundError extends HttpError {
  constructor(message) {
    super({ message, status: 404 });
  }
};
