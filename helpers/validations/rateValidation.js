const rateValidate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
  
    if (!Number(rate) >= 1 && !Number(rate) <= 5 && !Number(rate) % 1 === 0) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    
    next();
  };
  
  module.exports = rateValidate;