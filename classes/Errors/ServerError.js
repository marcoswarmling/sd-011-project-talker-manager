import HttpError from './HttpError';

export default class ServerError extends HttpError {
  constructor(message) {
    const finalMessage = message || 'Erro interno no servidor.';
    super({ message: finalMessage, status: 500 });
  }
}
