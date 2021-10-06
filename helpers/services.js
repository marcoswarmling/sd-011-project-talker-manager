// https://www.codegrepper.com/code-examples/javascript/random+letter+in+javascript+generator
// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js (another way: import crypto) const token = crypto.randomBytes(8).toString('hex');
const generateToken = (size) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let index = 0; index < size; index += 1) {
    token += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return token;
};

// https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/49178339
// regex is enough
const checkMonthYear = (year, month) => {
  const isValidYearAndMonth = year >= 1000 || month <= 12 || month > 0;
  return !!isValidYearAndMonth;
};

const checkDay = (day, month, year) => {
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }
  return day > 0 && day <= monthLength[month - 1];
};

const isValidDate = (dateString) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;
  const splitedDate = dateString.split('/');
  const day = Number(splitedDate[0]);
  const month = Number(splitedDate[1]);
  const year = Number(splitedDate[2]);
  const checkDayMonthYear = checkMonthYear(year, month) && checkDay(day, month, year);
  return checkDayMonthYear;
};

module.exports = { generateToken, isValidDate };
