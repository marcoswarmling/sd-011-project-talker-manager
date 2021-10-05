const SelfNamedError = require('./SelfNamedError');

module.exports = class HttpError extends SelfNamedError {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }
};
