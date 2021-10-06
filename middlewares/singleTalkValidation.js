const checkFields = (talk) => {
  if (!talk || talk === '' || !talk.watchedAt) {
    return false;
  }
  return true;
};

const singleTalkValidation = (req, res, next) => {
  const { talk } = req.body;
  const fieldsCheck = checkFields(talk);
  if (!fieldsCheck) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = singleTalkValidation;