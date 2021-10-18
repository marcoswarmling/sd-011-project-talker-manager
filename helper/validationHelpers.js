const validateToken = (token) => {
  if (!token) return null;
  if (token.length !== 16) return false;
};

const validateName = (name) => {
  if (!name) return null;
  if (name.length < 3) return false;
};

const validateAge = (age) => {
  if (!age) return null;
  if (age < 18) return false;
};

const validateWatchedAt = (watchedAt) => {
  const dateFormatRegex = /^([0-9]{2})+\/+([0-9]{2})+\/+([0-9]{4})$/;
  return dateFormatRegex.test(watchedAt);
};

const validateRate = (talk) => {
  if (talk.rate === undefined) {
    return false;
  }

  if (Number.isInteger(talk.rate) && (talk.rate < 1 || talk.rate > 5)) {
    return false;
  }

  return true;
};

const validateEmail = (email) => {
  const emailRegex = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return emailRegex.test(email);
};

const validateTalk = (talk) => (talk && (talk.rate || talk.rate === 0) && talk.watchedAt);

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
  validateEmail,
};
