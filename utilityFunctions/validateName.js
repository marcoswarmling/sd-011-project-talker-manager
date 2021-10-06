function validateName(name) {
  const nameLength = { message: 'O "name" deve ter pelo menos 3 caracteres' };
  const emptyName = { message: 'O campo "name" é obrigatório' };

  if (!name) return emptyName;
  if (name.length < 3) return nameLength;
  return null;
}

module.exports = validateName;
