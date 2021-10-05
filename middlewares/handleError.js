const { HttpError } = require('../classes/Errors');

module.exports = function handleError(err, _req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).end();
};
