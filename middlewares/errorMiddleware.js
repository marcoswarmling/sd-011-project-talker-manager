const errorMiddleware = (error, _req, res, _next) => {
  if (error.code && error.status) {
    return res.status(error.status).json({ message: error.message, code: error.code });
  }

  return res.status(500).json({ message: error.message });
};

module.exports = errorMiddleware;