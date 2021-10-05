const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');
const crypto = require('crypto');

const { ValidationError } = require('../classes/Errors');

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const loginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', pattern: '.+@.+\\..+' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: 'O "email" deve ter o formato "email@email.com"',
      password: 'O "password" deve ter pelo menos 6 caracteres',
    },
    required: {
      email: 'missing email',
      password: 'missing password',
    },
  },
};

const login = ({ email, password }) => new Promise((resolve, reject) => {
  const validate = ajv.compile(loginSchema);
  const valid = validate({ email, password });
  if (!valid) {
    return reject(new ValidationError(validate.errors));
  }
  const token = crypto.randomBytes(8).toString('hex');

  return resolve({ token });
});

module.exports = {
  login,
};
