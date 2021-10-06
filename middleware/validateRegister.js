const validateName = require('../utilityFunctions/validateName');
const validateAge = require('../utilityFunctions/validateAge');
const validateTalk = require('../utilityFunctions/validateTalk');

function validateRegister(req, res, next) {
  const { name, age, talk } = req.body;

  const validatedName = validateName(name);
  const validatedAge = validateAge(age);
  const validatedTalk = validateTalk(talk);

  if (validatedName !== null) return res.status(400).json(validatedName);
  if (validatedAge !== null) return res.status(400).json(validatedAge);
  if (validatedTalk !== null) return res.status(400).json(validatedTalk);

  next();
}

module.exports = validateRegister;
