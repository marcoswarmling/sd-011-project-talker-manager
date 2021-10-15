export default function validationDate(req, res, next) {
    const { talk } = req.body;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
        return res.status(400).json({
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
      }
      if (!regex.test(talk.watchedAt)) {
        return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }
      next();
    }
