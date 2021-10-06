const Ajv = require('ajv').default;

const ajv = new Ajv({ allErrors: true });

require('ajv-errors')(ajv /* , {singleError: true} */);

const tokenSchema = {
  type: 'object',
  required: ['authorization'],
  properties: {
    authorization: {
      type: 'string',
      pattern: '^[a-zA-Z0-9-_]{16}$',
    },
  },
  errorMessage: {
    required: {
      authorization: 'Token não encontrado',
    },
    properties: {
      authorization: 'Token inválido',
    },
  },
};

const validate = ajv.compile(tokenSchema);

const validToken = (req, res, next) => {
  console.log(req.headers);
  if (!validate(req.headers)) {
    return res.status(401).json({ message: validate.errors[0].message });
  }
  next();
};
module.exports = validToken;
