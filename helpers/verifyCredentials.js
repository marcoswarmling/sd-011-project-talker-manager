function verifyEmail(email) {
  /** Para realizar o uso de verificação do email, tive que usar o regex pattern
   * para verificação de email abaixo:
   * Source: https://forum.blip.ai/t/resolvido-regex-para-validacao-de-email/1635 */
  const emailPattern = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
  console.log(emailPattern.test(email));
  return emailPattern.test(email);
}

function verifyPassword(password) {
  const minimalRequiredLength = 6;
  if (password.length >= minimalRequiredLength) {
    return true;
  }
}

module.exports = {
  verifyEmail,
  verifyPassword,
};
