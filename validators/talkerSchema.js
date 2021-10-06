const Ajv = require('ajv').default;

const ajv = new Ajv({ allErrors: true });

require('ajv-errors')(ajv /* , {singleError: true} */);

const talkerSchema = {
  type: 'object',
  required: ['name', 'age', 'talk'],
  properties: {
    name: {
      type: 'string',
      minLength: 3,
    },
    age: {
      type: 'number',
      minimum: 18,
    },
    talk: {
      type: 'object',
      required: ['watchedAt', 'rate'],
      properties: {
        watchedAt: {
          type: 'string',
          pattern: '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$',
        },
        rate: {
          type: 'number',
          minimum: 1,
          maximum: 5,
        },
      },
      errorMessage: {
        required: {
          watchedAt: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
          rate: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        },
        properties: {
          watchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
          rate: 'O campo "rate" deve ser um inteiro de 1 à 5',
        },
      },
    },
  },
  errorMessage: {
    required: {
      name: 'O campo "name" é obrigatório',
      age: 'O campo "age" é obrigatório',
      talk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    },
    properties: {
      name: 'O "name" deve ter pelo menos 3 caracteres',
      age: 'A pessoa palestrante deve ser maior de idade',
      talk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    },
  },
};

const validate = ajv.compile(talkerSchema);
const validTalker = (req, res, next) => {
  if (!validate(req.body)) {
    return res.status(400).json({ message: validate.errors[0].message });
  }

  next();
};

module.exports = validTalker;
