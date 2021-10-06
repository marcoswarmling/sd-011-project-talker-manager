const HTTP_INTERNAL_SERVER_ERROR = 500;

function errorMiddlewares(err, _req, res, _next) { 
   res.status(HTTP_INTERNAL_SERVER_ERROR)
    .send({ message: `Erro no inesperado, tente novamente mais tarde. (${err.message})` });
}

module.exports = {
  errorMiddlewares,
};
