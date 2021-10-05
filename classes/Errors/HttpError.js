import SelfNamedError from './SelfNamedError';

export default class HttpError extends SelfNamedError {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }
}
