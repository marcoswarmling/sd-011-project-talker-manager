const error = (err, _req, res, _next) => res.status(err.status).json({ message: err.message });

module.exports = error;
