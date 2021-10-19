function validateToken(token) {
  const tokenRegex = /[\w]{16}/;

  return (tokenRegex.test(token));
}

module.exports = { validateToken };