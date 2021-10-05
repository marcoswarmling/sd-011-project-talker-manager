import HttpError from './HttpError';

export default class InvalidFieldError extends HttpError {
  constructor(message) {
    super({ message, status: 400 });
  }
}
