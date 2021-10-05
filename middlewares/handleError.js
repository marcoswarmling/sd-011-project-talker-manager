const { HttpError } = require('../classes/Errors');

module.exports = function handleError(err, _req, res, _next) {
  if (err instanceof HttpError) {
    if (err.status === 500) {
      console.log(err);
    }
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).end();
};
