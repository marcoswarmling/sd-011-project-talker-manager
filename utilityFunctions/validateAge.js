function validateAge(age) {
  const emptyAge = { message: 'O campo "age" é obrigatório' };
  const minor = { message: 'A pessoa palestrante deve ser maior de idade' };

  if (!age) return emptyAge;
  if (age < 18) return minor;

  return null;
}

module.exports = validateAge;
