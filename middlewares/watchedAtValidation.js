// Valida o obj talker:
const watchedAtValidation = (req, res, next) => {
    const { talk } = req.body;

    // regex para validar o formato da data:
    const REGEX_VALID_DATE = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

// retorna erro caso a data não esteja no formato adequado:
if (!REGEX_VALID_DATE.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}

next();
};

module.exports = watchedAtValidation;