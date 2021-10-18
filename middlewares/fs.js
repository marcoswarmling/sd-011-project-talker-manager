const isValidToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    next();
  };

  const isValidTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk || !((talk.rate || talk.rate === 0) && talk.watchedAt)) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
    }

    next();
  };

  module.exports = { isValidToken, isValidTalk};