const HttpError = require('./HttpError');
const ServerError = require('./ServerError');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');
const AuthorizationError = require('./AuthorizationError');

module.exports = {
  HttpError,
  ServerError,
  NotFoundError,
  ValidationError,
  AuthorizationError,
};
