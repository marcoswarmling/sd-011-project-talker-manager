const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');

const { ValidationError } = require('../classes/Errors');

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

function validate(schema, data) {
  const ajvValidate = ajv.compile(schema);
  const valid = ajvValidate(data);

  if (!valid) {
    throw new ValidationError(ajvValidate.errors);
  }
}

module.exports = {
  validate,
};
