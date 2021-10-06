const Ajv = require('ajv').default;

const ajv = new Ajv({ allErrors: true });

require('ajv-errors')(ajv /* , {singleError: true} */);

const tokenSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: {
      type: 'string',
      pattern: '^[a-zA-Z0-9-_]{16}$',
    },
  },
  errorMessage: {
    required: {
      token: 'Token não encontrado',
    },
    properties: {
      token: 'Token inválido',
    },
  },
};

const validate = ajv.compile(tokenSchema);

const validToken = (req, res, next) => {
  console.log(req.headers);
  if (!validate(req.body)) {
    return res.status(401).json({ message: validate.errors[0].message });
  }
  next();
};
module.exports = validToken;
