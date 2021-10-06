function validateTalkRate(talk) {  
  const notInRange = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  if (talk.rate < 1 || talk.rate > 5) return notInRange;
  return null;
}

// function validateTalkWatchedAt(talk) {
//   const wrongDateFormat = {
//     message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
//   };
//   if (talk.watchedAt) return wrongDateFormat;
//   return null;
// }

function validateTalk(talk) {
  const emptyTalk = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };
  const talkRate = validateTalkRate(talk);

  if (talkRate !== null) return talkRate;
  if (!talk || !talk.watchedAt || !talk.rate) return emptyTalk;
  // validateTalkWatchedAt(talk);
  return null;
}

module.exports = validateTalk;
