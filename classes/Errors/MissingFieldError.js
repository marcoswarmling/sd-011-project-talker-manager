import HttpError from './HttpError';

export default class MissingFieldError extends HttpError {
  constructor(field) {
    const message = `O campo "${field}" é obrigatório`;
    super({ message, status: 400 });
  }
}
