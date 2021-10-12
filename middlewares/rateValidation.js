const validateRate = (req, res, next) => {
  const { rate } = req.body;
  const rateFormat = /^[1-5]$/;                   
  if (!rateFormat.test(rate)) { 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateRate;