function validateWatchedAt(watchedAt) {
  const dateRegex = /[\d]{2}\/[\d]{2}\/[\d]{4}/;
  return (dateRegex.test(watchedAt));
}

function validateRate(rate) {
  return (rate === parseInt(rate, 10) && rate > 1 && rate < 5);
}

module.exports = { validateWatchedAt, validateRate };