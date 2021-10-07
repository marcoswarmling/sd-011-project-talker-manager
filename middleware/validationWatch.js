const HTTP_ERROR_STATUS = 400;

const watchValid = (req, res, next) => {
  const { talk } = req.body;

  const dateFormat = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

  if (!dateFormat.test(talk.watchedAt)) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchValid;
