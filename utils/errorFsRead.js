module.exports = function errorFsRead(err, req, res, next) {
    if (err.code === 'ENOENT') {
      const newError = new Error(err.message);
      newError.code = 'file_not_found';
      newError.status = 404;
      return next(newError);
    }
  
    return next(err);
  }; 