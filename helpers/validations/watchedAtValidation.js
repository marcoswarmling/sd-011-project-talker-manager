const watchedAtValidate = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
    const dateRegex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;
  
    if (!dateRegex.test(watchedAt)) {
      return res.status(400).json({
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    
    next();
  };
  
  module.exports = watchedAtValidate;