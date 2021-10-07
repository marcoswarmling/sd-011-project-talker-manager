const validRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    const rateEntreUmeCinco = /^[1-5]*$/;
  
    if (!rateEntreUmeCinco.test(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };

module.exports = validRate;