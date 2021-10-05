module.exports = class SelfNamedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
