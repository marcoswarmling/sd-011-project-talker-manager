// const moment = require('moment');
// const isValidDate = moment(talk.watchedAt, 'DD/MM/YYYY', true).isValid();

function validateWatchedAtAndDate(talk) {
  const checkDate = (date) => {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    return pattern.test(date);
  }; 
  const isValidDate = checkDate(talk.watchedAt);
  const wrongDateFormat = {
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  };
  const notInRange = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  if (talk.rate < 1 || talk.rate > 5) return notInRange;
  if (!isValidDate) return wrongDateFormat;
  return null;
}

function isTalkEmpty(talk) {
  const emptyTalk = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) return emptyTalk;
  return null;
}

function validateTalk(talk) {
  const validEmptyTalk = isTalkEmpty(talk);
  if (validEmptyTalk !== null) return validEmptyTalk;
  const validContent = validateWatchedAtAndDate(talk);
  if (validContent !== null) return validContent;
  return null;
}

module.exports = validateTalk;
