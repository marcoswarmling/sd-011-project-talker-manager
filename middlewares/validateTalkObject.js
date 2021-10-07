function ValidateTalkObject(req, res, next) {
  const { talk } = req.body;
  const expDateValidate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!talk.watchedAt || expDateValidate.test(talk.watchedAt)) {
    return res.status(400).json({
       message: 'O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"', 
    });
}

  if (talk.rate < 0 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo \"rate\" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = ValidateTalkObject;