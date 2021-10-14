function valTalkObj(req, res, next) {
  const { talk } = req.body;
  const regexValTalkObj = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regexValTalkObj.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

module.exports = valTalkObj;