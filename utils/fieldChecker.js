module.exports = function fieldChecker(status, msg, next, bool) {
    if (bool) {
  return next({ status, message: msg });
  }
};