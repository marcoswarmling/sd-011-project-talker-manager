class SelfNamedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class HttpError extends SelfNamedError {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }
}

class MissingFieldError extends HttpError {
  constructor(field) {
    const message = `O campo \"${field}\" é obrigatório`;
    super({ message, status: 400 });
  }
}

class InvalidFieldError extends HttpError {
  constructor(message) {
    super({ message, status: 400 });
  }
}

class ServerError extends HttpError {
  constructor(message) {
    const message = message || 'Erro interno no servidor.';
    super({ message, status: 500 });
  }
}
